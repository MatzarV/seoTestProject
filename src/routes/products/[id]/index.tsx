import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";

export const useProduct = routeLoader$(async () => {
    let data = null;
    try {
        const resp = await fetch('https://limberit.cloud/quicideportes/api_sgi/public/api/baseproduct/29/products');
        const responseData = await resp.json();
        data = responseData.data[0];
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }

    if (!data) {
        // Datos de información estática en caso de que no se hayan obtenido los datos de la API
        data = {
            base_product: 'Título del producto por defecto',
            gender_line: 'Descripción por defecto',
            design: 'Diseño por defecto',
            slug: 'Slug por defecto',
            image: 'https://img.freepik.com/premium-photo/wet-glass-view-branches-park-autumn-abstract-background-drops-window-evening-november_548821-30118.jpg',
        };
    }
    return data;
})

export default component$(() => {

    const productResp = useProduct();
    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-2xl">Producto encontrado: </span>
            </div>

            <div class="flex flex-col">
                <span class="my-5 text-5xl">{productResp.value.base_product}</span>
            </div>

            <button class="btn btn-primary">
                <Link href="/products">Regresar a productos</Link>
            </button>
        </>
    );
});

export const head: DocumentHead = ({ resolveValue }) => {
    const metadata = resolveValue(useProduct);
    return {
        title: metadata.base_product,
        meta: [
            {
                name: 'description',
                content: metadata.gender_line,
            },
            {
                name: 'keywords',
                content: `${metadata.design} ${metadata.slug}, ${metadata.gender_line} ${metadata.slug}`,
            },
            {
                property: 'og:title',
                content: `${metadata.base_product}`,
            },
            {
                property: 'og:description',
                content: `${metadata.gender_line}`,
            },
            {
                property: 'og:image',
                content: `https://limberit.cloud/quicideportes/files/${metadata.image}`,
            },
        ],
    };
};
