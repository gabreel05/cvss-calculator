'use client';

import { Button } from '@/components/ui/button';

export default function SignUp() {
  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    const formData = new FormData();
    formData.append('user_name', email.value);
    formData.append('password', password.value);

    const response = await fetch(
      `http://localhost:8005/create_user?user_name=${email.value}&password=${password.value}`,
      {
        method: 'POST',
      }
    );

    const data = await response.json();

    if (data.status === 'Usuário criado com sucesso') {
      window.location.href = '/signin';
    }

    console.log(data);

    console.log(email.value, password.value);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-gray-900">
        CVSS 3.1 Vulnerability Metrics Calculator
      </h1>
      <div className="flex flex-col items-center justify-center w-96 h-96 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">Sign Up</h1>
        <form className="flex flex-col w-80 space-y-4" onSubmit={handleSignUp}>
          <label htmlFor="email" className="text-sm text-slate-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-slate-200 rounded-md"
          />
          <label htmlFor="password" className="text-sm text-slate-900">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-slate-200 rounded-md"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-slate-900 rounded-md"
          >
            Sign Up
          </button>
          <Button
            variant={'outline'}
            type="button"
            onClick={() => {
              window.location.href = '/signin';
            }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
