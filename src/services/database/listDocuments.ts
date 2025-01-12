import { databaseCollectionIds, databaseId } from "consts/general";
import { databases } from "inits/backend";
import { DatabaseDocument, RequestResponse } from "types/general";

interface Props<T> {
  collection: keyof typeof databaseCollectionIds;
}

export const listDocuments = async <T>(props: Props<T>): RequestResponse<T> => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      databaseCollectionIds[props.collection]
    );

    const documents = result.documents.map((document) => ({
      id: document.$id,
      createdAt: document.$createdAt,
    }));

    return {
      success: true,
      data: documents,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
};
