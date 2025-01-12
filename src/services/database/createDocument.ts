import { ID, Models } from "appwrite";
import { databaseCollectionIds, databaseId } from "consts/general";
import { databases } from "inits/backend";
import { RequestResponse } from "types/general";

interface Props<T> {
  data: T;
  collection: keyof typeof databaseCollectionIds;
}

export const createDocument = async <T>(
  props: Props<T>
): RequestResponse<string> => {
  try {
    const result = await databases.createDocument(
      databaseId,
      databaseCollectionIds[props.collection],
      ID.unique(),
      props.data as Models.Document
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
