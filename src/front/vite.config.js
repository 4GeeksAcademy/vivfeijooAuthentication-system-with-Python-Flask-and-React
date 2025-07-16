import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    port: 5173 // ⚠️ cualquier puerto libre, por ejemplo este
  }
};
