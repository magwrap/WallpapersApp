import { createClient } from "pexels";
const client = createClient(
  // prettier-ignore
  '563492ad6f9170000100000144fca9adc7604d6da074fd346b1f5514'
);
const usePexels = () => {
  const fetchCategoryPhotos = async (page: number = 1, queryName: string = "All", setError: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
        const query = queryName;
        const photos = await client.photos.curated({ query, per_page: 14, page });
    
        return photos;
      } catch (err) {
        console.error(err);
        setError(true);
      }
      return null;
    };

const fetchPhoto = async(id: number) => {
    try{
        const photo = client.photos.show({ id });
        return photo;
    } catch(err) {
        console.error(err);
    }
}

  return {
      fetchCategoryPhotos,
      fetchPhoto,
  };
}

export default usePexels;