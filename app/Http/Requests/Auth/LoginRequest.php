<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Permitimos que se ejecute la petición
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * Usamos 'matricula' en lugar de 'email'.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'matricula' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        // 1. Verificar si hay demasiados intentos fallidos (seguridad)
        $this->ensureIsNotRateLimited();

        // 2. Intentar autenticar usando 'matricula' y 'password'
        if (! Auth::attempt($this->only('matricula', 'password'), $this->boolean('remember'))) {
            // 3. Si falla, registramos un intento y lanzamos una excepción
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'matricula' => trans('auth.failed'),
            ]);
        }

        // 4. Si es exitoso, limpiamos el contador de intentos fallidos
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'matricula' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     *
     * Usamos la matrícula para generar la clave de bloqueo.
     */
    public function throttleKey(): string
    {
        // Usamos $this->input('matricula') para obtener el valor del formulario
        return Str::transliterate(Str::lower($this->input('matricula')).'|'.$this->ip());
    }
}