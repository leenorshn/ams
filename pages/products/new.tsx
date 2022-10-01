import { addDoc, collection, onSnapshot, query, Timestamp } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react"
import { db } from "../../utils/firebase";

export default function NewProduct() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        price: 0.0,
        quantity: 0.0,
        url: "",
    })

    const [images, setImages] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        const q = query(collection(db, "images"),);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ops = [];
            querySnapshot.forEach((doc) => {
                ops.push({ ...doc.data(), id: doc.id });
            });
            // console.log(ops);

            setImages(ops);
        });
        return () => unsubscribe()

    }, []);


    const addProduct = async () => {
        try {
            setLoading(true);
            const docRef = await addDoc(collection(db, "products"), {
                ...form,
                date: Timestamp.now(),
            });
            setShow(false)
            setLoading(false);
            setForm({ name: "", price: 0, quantity: 0, url: "" })
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <form className="space-y-8 divide-y divide-gray-200 max-w-3xl mx-auto">
            <div className="space-y-8 divide-y divide-gray-200">



                <div className="pt-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Nouveau produit</h3>
                            <p className="mt-1 text-sm text-gray-500">Tout les champs sont obligatoire</p>
                        </div>
                        <Link href={"/products"}>
                            <a className="px-8 py-2 rounded-md bg-black text-white">Retour</a>
                        </Link>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-5">
                            <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                                Nom produit
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="product-name"
                                    id="product-name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-5">
                            {!show && <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShow(true)
                                }}
                                className="block text-sm font-medium text-gray-700 py-2 px-16 border border-slate-400 rounded-md bg-white">
                                Choisir image
                            </button>}
                            {
                                show ? <div className="flex max-w-4xl overflow-x-auto" id="image">
                                    {images && images.map(img =>
                                    (<img key={img.id} src={img.url} alt={img.id} onClick={(e) => {
                                        e.preventDefault()
                                        setForm({ ...form, url: img.url })
                                        setShow(false)
                                    }} className="h-20 w-32 mx-2 rounded-md" />)
                                    )}
                                </div> : <img src={form.url} className="h-20 w-32 mx-2 rounded-md" alt={form.url} />}

                        </div>




                        <div className="sm:col-span-5">
                            <label htmlFor="prix_achat" className="block text-sm font-medium text-gray-700">
                                Prix
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="prix_achat"
                                    id="prix_achat"
                                    placeholder="0.0"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>



                        <div className="sm:col-span-5">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                Quantite
                            </label>
                            <div className="mt-1">
                                <input
                                
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    value={form.quantity}
                                    onChange={(e) => setForm({ ...form, quantity: parseFloat(e.target.value) })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>


                    </div>
                </div>


            </div>

            <div className="pt-5">
                {loading ? <h1>Encours ...</h1> : (<div className="flex justify-evenly">
                    <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault()
                            addProduct();
                        }}
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Enregistrer
                    </button>
                </div>)}
            </div>
        </form>
    )
}
