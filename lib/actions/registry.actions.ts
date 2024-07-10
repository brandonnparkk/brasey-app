'use server'

import { revalidatePath } from 'next/cache'

import { connect } from '@/lib/database'
import { handleError } from '@/lib/utils'
import RegistryItems from '@/lib/database/models/registry.model'
import { GetAllRegistryItemsParams } from '@/types';

// const populateEvent = (query: any) => {
//   return query
//     .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
//     .populate({ path: 'category', model: Category, select: '_id name' })
// }

// export async function addRegistryItem(item: any) {
//   try {
//     await connect();
//     const newItem = await RegistryItems.create(item);
//     return JSON.parse(JSON.stringify(newItem));
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getAllRegistryItems({ query, limit = 6, page }: GetAllRegistryItemsParams) {
  try {
    await connect();

    const skipAmount = (Number(page) - 1) * limit
    const registryItemsQuery = await RegistryItems.find({})
      .sort({ itemName: 'desc' })

    // const registryItems = await populateEvent(registryItemsQuery)
    // const registryItemsCount = await RegistryItems.countDocuments(conditions)

    return {
      // data: JSON.parse(JSON.stringify(registryItems)),
      // totalPages: Math.ceil(registryItemsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}