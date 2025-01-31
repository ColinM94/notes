import { databaseCollectionIds } from "consts/general";
import { RequestResponse } from "types/general";

interface Props<T> {
  collection: keyof typeof databaseCollectionIds;
  documentId: string;
}

export const deleteDocument = async <T>(
  props: Props<T>
): RequestResponse<undefined> => {
  try {
    // const result = await databases.deleteDocument(
    //   databaseId,
    //   databaseCollectionIds[props.collection],
    //   props.documentId
    // );
    // return {
    //   success: true,
    //   data: undefined,
    // };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
};
