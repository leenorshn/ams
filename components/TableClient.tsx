import { PencilIcon } from "@heroicons/react/24/outline"
import { collection, onSnapshot, query } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase"
import Empty from "./Empty"


/* This example requires Tailwind CSS v2.0+ */


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TableClient() {

    const [clients, setClients] = useState([])

    useEffect(() => {
        const q = query(collection(db, "clients"),);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ops = [];
            querySnapshot.forEach((doc) => {
                ops.push({ ...doc.data(), id: doc.id });
            });
            console.log(ops);

            setClients(ops);
        });
        return () => unsubscribe()

    }, []);
    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">{clients.length} Clients</h1>

                </div>

            </div>
            {
                clients.length == 0 ? <Empty label={"produit"} /> : (<div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg bg-white">
                    <table className="overflow-hidden min-w-full divide-y divide-gray-300">
                        <thead className="bg-black rounded-t-md">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6">
                                    image
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-100 lg:table-cell"
                                >
                                    nom
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-100 lg:table-cell"
                                >
                                    email
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((plan, planIdx) => (
                                <tr key={plan.id}>
                                    <td><img src={plan.avatar} alt="" /></td>

                                    <td>
                                        {plan.name}
                                    </td>
                                    <td>
                                        {plan.email}
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)
            }
        </div>
    )
}