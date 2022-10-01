/* This example requires Tailwind CSS v2.0+ */
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'

const stats = [
    { name: 'Entrer', amount: 4005.9, change: '12%', changeType: 'increase' },
    { name: 'Sortie', amount: 712, change: '2.02%', changeType: 'increase' },
    { name: 'Balance', amount: 3993.9, change: '4.05%', changeType: 'decrease' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CaisseStat() {
    return (
        <div>

            <dl className="mt-3 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
                {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 sm:p-6">
                        <dt className="text-base font-normal text-gray-900">{item.name}</dt>
                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                            <div className={classNames(item.name == "Sortie" ? "text-red-600" : "text-indigo-600", "flex items-baseline text-2xl font-semibold ")}>
                                {item.amount}
                                <span className={classNames(item.name === "Sortie" ? "text-red-600" : "text-gray-500", "ml-2 text-sm font-medium ")}>USD</span>
                            </div>

                            <div
                                className={classNames(
                                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                    'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                                )}
                            >
                                {item.changeType === 'increase' ? (
                                    <ArrowUpIcon
                                        className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <ArrowDownIcon
                                        className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                        aria-hidden="true"
                                    />
                                )}

                                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                {item.change}
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
