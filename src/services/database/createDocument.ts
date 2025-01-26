import { ID, Models } from "appwrite";
import { databaseCollectionIds, databaseId } from "consts/general";
import { databases } from "inits/backend";
import { RequestResponse } from "types/general";

interface Props<T> {
  data: Omit<T, "id" | "createdAt" | "updatedAt">;
  collection: keyof typeof databaseCollectionIds;
}

export const createDocument = async <T>(
  props: Props<T>
): RequestResponse<string> => {
  try {
    const id = ID.unique();

    const result = await databases.createDocument(
      databaseId,
      databaseCollectionIds[props.collection],
      id,
      {
        ...props.data,
        id,
      }
    );

    return {
      success: true,
      data: result.$id,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
};
