import {create} from  "zustand";
const useStore =create((set) => ({
    products:[],
    addProduct:(products :any) =>
       set((state: any) => ({products: [...state.products, products]})),
}))

export default useStore;