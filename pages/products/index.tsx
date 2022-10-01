import { PencilIcon } from "@heroicons/react/24/outline"
import { collection, onSnapshot, query } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import Empty from "../../components/Empty"
import { db } from "../../utils/firebase"

/* This example requires Tailwind CSS v2.0+ */


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const q = query(collection(db, "products"),);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ops = [];
            querySnapshot.forEach((doc) => {
                ops.push({ ...doc.data(), id: doc.id });
            });
            // console.log(ops);

            setProducts(ops);
        });
        return () => unsubscribe()

    }, []);
    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">{products && products.length} Produits</h1>

                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link href="/products/new">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Nouveau
                        </button>
                    </Link>
                </div>
            </div>
            {products &&
                products.length == 0 ? <Empty label={"produit"} /> : (<div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg bg-white">
                    <table className="overflow-hidden min-w-full divide-y divide-gray-300">
                        <thead className="bg-black rounded-t-md">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6">
                                    Image
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-100 lg:table-cell"
                                >
                                    Nom
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-100 lg:table-cell"
                                >
                                    Prix
                                </th>

                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">
                                    Quantite
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Select</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((plan, planIdx) => (
                                <tr key={plan.id}>
                                    <td
                                        className={classNames(
                                            planIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-1 pl-4 sm:pl-6 pr-3 text-sm'
                                        )}
                                    >
                                        <div className="font-medium text-gray-900">
                                            <img src={plan.url} className="h-16 w-16 object-cover object-center rounded-lg" />

                                        </div>
                                        <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                                            <span>
                                                {plan.name}
                                            </span>

                                        </div>
                                        {planIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                                    </td>
                                    <td
                                        className={classNames(
                                            planIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-1 text-sm text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {plan.name}
                                    </td>
                                    <td
                                        className={classNames(
                                            planIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-1 text-sm text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {plan.price}$
                                    </td>
                                    <td
                                        className={classNames(
                                            planIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-1 text-sm text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {plan.quantity} cartons
                                    </td>

                                    <td
                                        className={classNames(
                                            planIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-1 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                                        )}
                                    >
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-gray-300 bg-slate-800 text-white px-3 py-2 text-sm font-medium leading-4  shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2  disabled:cursor-not-allowed disabled:opacity-30"
                                        >
                                            <PencilIcon className="h-4 w-4" /><span className="sr-only">, {plan.name}</span>
                                        </button>
                                        {planIdx !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
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
