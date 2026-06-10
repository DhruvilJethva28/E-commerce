import create from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  totalPrice: 0,

  addItem: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.product._id === item.product._id);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.product._id === item.product._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      };
    }
    return { items: [...state.items, item] };
  }),

  removeItem: (productId) => set((state) => ({
    items: state.items.filter((i) => i.product._id !== productId),
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map((i) =>
      i.product._id === productId ? { ...i, quantity } : i
    ),
  })),

  clearCart: () => set({ items: [], totalPrice: 0 }),

  setItems: (items) => set({ items }),
  calculateTotal: () => set((state) => ({
    totalPrice: state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ),
  })),
}));

export default useCartStore;
