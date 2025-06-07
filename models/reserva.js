const API_BASE_URL = 'https://api.example.com/reserva';

export const ReservaModel = {
  async findAll() {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Assuming API returns an array of reservations
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },

  async create(numero, andar) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numero, andar }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Assuming API returns the created reservation
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  async update(reserva_id, numero, andar) {
    try {
      const response = await fetch(`${API_BASE_URL}/${reserva_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numero, andar }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Assuming API returns the updated reservation
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  },

  async delete(reserva_id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${reserva_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  },
};