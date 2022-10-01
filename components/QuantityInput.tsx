/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function QuantityInput() {
    return (
        <div>
            <label htmlFor="Quantity" className="block text-sm font-medium text-gray-700">
                Quantité
            </label>
            <div className="mt-1">
                <input
                    type="number"
                    name="quantity"
                    id="Quantity"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0"
                />
            </div>
        </div>
    )
}