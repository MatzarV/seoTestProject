import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";

export const userProductsList = routeLoader$(async () => {
    const resp = await fetch('https://limberit.cloud/quicideportes/api_sgi/public/api/baseproduct/type/sportline/1/products');
    const data = await resp.json();
    return data.data;
})

export default component$(() => {

    const productsResp = userProductsList();
    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Productos</span>
            </div>

            <button class="btn btn-primary">
                <Link href="/products/1">Visitar un producto</Link>
            </button>

            <div class="grid grid-cols-6 mt-5">
                {
                    productsResp.value.map(({ base_product }: any) => (
                        <div key={base_product} class="m-5 flex flex-col justify-center items-center"> {base_product} </div>
                    ))
                }
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Quici",
    meta: [
        {
            name: "description",
            content: "Producto en venta de Quici",
        },
        {
            name: "keywords",
            content: "productos quici, quici deportes productos, ropa deportiva",
        },
        {
            property: 'og:title',
            content: 'Productos',
        },
        {
            property: 'og:description',
            content: 'Esta es la descripción de mis productos',
        },
        {
            property: 'og:image',
            content: 'https://i.imgur.com/IvSFvs9.jpg',
        },
    ],
};
