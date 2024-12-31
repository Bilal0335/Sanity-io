import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export const getProductData = async () => {
  const res = await client.fetch(
    `*[_type == 'product']{
      title,
      description,
      image
    }`
  );
  return res;
};

interface IProductData {
  title: string;
  description: string;
  image: [
    {
      asset: {
        _ref: string;
      };
    }
  ];
}

export default async function Home() {
  const data: IProductData[] = await getProductData();
  console.log(data);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          <p>{item.description}</p>
          {item.image && (
            <img
              src={urlFor(item.image).width(200).url()}
              alt={item.title}
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
