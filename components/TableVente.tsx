/* This example requires Tailwind CSS v2.0+ */

import Moment from "react-moment"
export default function TableVente({ data }) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">

            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Produit
                                        </th>


                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Prix unitaire
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Quantit??
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Total
                                        </th>
                                        <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                <Moment
                                                    format="DD/MM/YYYY ?? HH:mm"
                                                    date={transaction.date.seconds * 1000}
                                                ></Moment>
                                            </td>
                                            <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                                {transaction.panier.map((p, i) => (<div key={i}>
                                                    <h1>{p.count}{p.product.name}</h1>

                                                </div>))}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.panier.map((p, i) => (<div key={i}>
                                                <h1>{p.product.price}$</h1>

                                            </div>))}</td>
                                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.panier.map((p, i) => (<div key={i}>
                                                <h1>{p.count}carton</h1>

                                            </div>))}</td>
                                            <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{transaction.montant}$</td>
                                            <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    facture<span className="sr-only">, {transaction.id}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
