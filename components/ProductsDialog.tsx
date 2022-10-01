/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition, RadioGroup } from '@headlessui/react'
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { useAuth } from '../utils/AuthContext'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductsDialog({ open, setOpen }) {
    const { setProduct } = useAuth()

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

    const [selected, setSelected] = useState(products[0])
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative w-[500px] z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                                <div className='max-w-3xl max-h-[500px]'>

                                    <div className="text-center">

                                        <div className='flex items-center justify-between'>
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Listes produits
                                            </Dialog.Title>
                                            <div className=" z-50">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full z-20 justify-center rounded-md border border-transparent bg-black px-4 py-1 text-base font-medium text-white shadow-sm focus:outline-none"
                                                    onClick={() => {
                                                        setProduct(selected)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    Choisir
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-6 lg:mt-0">
                                            <div className="relative my-4 flex items-center">
                                                <input
                                                    type="text"
                                                    name="search"
                                                    id="search"
                                                    placeholder='Rechercher par produit'
                                                    className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                                    <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                                                        ⌘K
                                                    </kbd>
                                                </div>
                                            </div>

                                            <RadioGroup value={selected} onChange={setSelected}>
                                                <RadioGroup.Label className="sr-only"> Server size </RadioGroup.Label>
                                                <div className="space-y-1 h-[440px] overflow-y-auto px-4 ">
                                                    {products.map((plan, i) => (
                                                        <RadioGroup.Option
                                                            key={plan.id}
                                                            value={plan}
                                                            className={({ checked, active }) =>
                                                                classNames(
                                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                                    active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                                                                    'relative block cursor-pointer rounded-lg border bg-slate-100 px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                                                                )
                                                            }
                                                        >
                                                            {({ active, checked }) => (
                                                                <>
                                                                    <span className="flex items-center">
                                                                        <span className="flex flex-col text-sm">

                                                                            <RadioGroup.Description as="span" className="text-gray-900">
                                                                                <span className="font-medium text-gray-900 mr-20">{plan.priceOfSell}$</span>
                                                                                <span className="block sm:inline">
                                                                                    {plan.name}
                                                                                </span>{' '}
                                                                                <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
                                                                                    &middot;
                                                                                </span>{' '}
                                                                                <span className="block sm:inline">{plan.category}</span>
                                                                            </RadioGroup.Description>
                                                                        </span>
                                                                    </span>
                                                                    <RadioGroup.Description
                                                                        as="span"
                                                                        className="mt-0 flex text-sm sm:mt-0 sm:ml-1 sm:flex-col sm:text-right"
                                                                    >
                                                                        <div className={classNames(
                                                                            active ? 'bg-blue-600' : 'bg-white',
                                                                            checked ? 'bg-blue-600' : 'bg-white',
                                                                            'h-5 w-5 rounded-lg'
                                                                        )}></div>

                                                                    </RadioGroup.Description>
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'border' : 'border-2',
                                                                            checked ? 'border-indigo-500' : 'border-transparent',
                                                                            'pointer-events-none absolute -inset-px rounded-lg'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                    <div className='h-16'>

                                                    </div>
                                                </div>
                                            </RadioGroup>

                                            {/* <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                                                <h3 className="sr-only">Items in your cart</h3>
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {products.map((product) => (
                                                        <li key={product.id} className="flex py-3 px-4 sm:px-6">
                                                            <div className="ml-6 flex flex-1 flex-col">
                                                                <div className="flex items-center space-x-4">
                                                                    <p className="mt-0 text-lg font-medium text-gray-900">{product.price}</p>
                                                                    <div className="min-w-0 flex-1">
                                                                        <h4 className="text-sm">
                                                                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                                                                {product.title}
                                                                            </a>
                                                                        </h4>

                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between pt-2">
                                                                        <div className="ml-4">
                                                                            <label htmlFor="quantity" className="sr-only">
                                                                                Quantity
                                                                            </label>
                                                                            <select
                                                                                id="quantity"
                                                                                name="quantity"
                                                                                className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                                            >
                                                                                <option value={1}>1</option>
                                                                                <option value={2}>2</option>
                                                                                <option value={3}>3</option>
                                                                                <option value={4}>4</option>
                                                                                <option value={5}>5</option>
                                                                                <option value={6}>6</option>
                                                                                <option value={7}>7</option>
                                                                                <option value={8}>8</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div className="ml-4 flow-root flex-shrink-0">
                                                                        
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
