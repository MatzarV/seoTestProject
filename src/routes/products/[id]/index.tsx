import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";

export const useProduct = routeLoader$(async () => {
    const resp = await fetch('https://limberit.cloud/quicideportes/api_sgi/public/api/baseproduct/29/products');
    const data = await resp.json();
    return data.data[0];
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
