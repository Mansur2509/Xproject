import { create } from 'zustand';
import { storage } from '@shared/lib/storage';

export interface Registration {
  id: string;
  eventType: 'MUN' | 'DEBATE' | 'WORKSHOP' | 'COURSE' | 'OTHER';
  eventName: string;
  participantName: string;
  email: string;
  phone: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface RegistrationsState {
  registrations: Registration[];
  addRegistration: (registration: Omit<Registration, 'id' | 'date' | 'status'>) => void;
  updateRegistration: (id: string, updates: Partial<Registration>) => void;
  deleteRegistration: (id: string) => void;
  getRegistrationsByType: (type: Registration['eventType']) => Registration[];
}

const REGISTRATIONS_KEY = 'user_registrations';

export const useRegistrationsStore = create<RegistrationsState>((set, get) => ({
  registrations: storage.get<Registration[]>(REGISTRATIONS_KEY) || [],

  addRegistration: (registration) => {
    const newRegistration: Registration = {
      ...registration,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [...get().registrations, newRegistration];
    storage.set(REGISTRATIONS_KEY, updated);
    set({ registrations: updated });
  },

  updateRegistration: (id, updates) => {
    const updated = get().registrations.map((reg) =>
      reg.id === id ? { ...reg, ...updates } : reg
    );
    storage.set(REGISTRATIONS_KEY, updated);
    set({ registrations: updated });
  },

  deleteRegistration: (id) => {
    const updated = get().registrations.filter((reg) => reg.id !== id);
    storage.set(REGISTRATIONS_KEY, updated);
    set({ registrations: updated });
  },

  getRegistrationsByType: (type) => {
    return get().registrations.filter((reg) => reg.eventType === type);
  },
}));
