import { pb } from "inits/backend";
import { RecordModel } from "pocketbase";
import { Collection, RequestResponse } from "types/general";

interface Params<T> {
  data: Omit<T, "id" | "createdAt" | "updatedAt">;
  collection: Collection;
}

export const createRecord = async <T>(
  params: Params<T>
): RequestResponse<RecordModel> => {
  try {
    const { collection, data } = params;

    const record = await pb.collection(collection).create(data);

    return {
      data: record,
      success: true,
    };
  } catch (error) {
    alert(error);
    return {
      success: false,
    };
  }
};
