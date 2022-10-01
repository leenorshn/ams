import { useRouter } from "next/router"
import { useState } from "react"
import { useAuth } from "../utils/AuthContext";


export default function Login() {

    const { currentUser, login, } = useAuth();
    const [err, setErr] = useState('')

    const [form, setForm] = useState({ email: "", password: '' })
    const loginFunc = async () => {
        if (form.email.length > 0 && form.password.length > 7) {
            try {
                await login(form.email, form.password);
            } catch (error) {
                setErr(error)
            }
        }
    }
    return (
        <div className="w-screen h-screen bg-blue-800">
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-3xl text-center text-white font-bold font-sans">Ams</h2>

                    <p className="mt-2 text-center text-sm text-gray-200">
                        login
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="Ex: admin@ams.com"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de passe
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        placeholder="Ex 12345678"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="text-red-600">
                                <p>{err}</p>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        loginFunc()
                                    }}
                                    className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm "
                                >
                                    Connexion
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    )
}
