import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <span class="text-5xl">Hola Mundo</span>

      <button class="btn btn-primary mt-4">
        <Link href="/products">Ir a productos</Link>
      </button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Quici",
  meta: [
    {
      name: "description",
      content: "Quici Productos deportivos",
    },
  ],
};
