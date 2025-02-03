import { pb } from "inits/backend";
import { Collection, RequestResponse } from "types/general";

interface Params {
  collection: Collection;
  filter?: string;
}

export const listRecords = async <T>(params: Params): RequestResponse<T[]> => {
  try {
    const { collection, filter } = params;

    const resultList = await pb.collection(collection).getFullList<T>({
      filter,
    });

    return {
      data: resultList,
      success: true,
    };
  } catch (error) {
    alert(error);
    return {
      success: false,
    };
  }
};
