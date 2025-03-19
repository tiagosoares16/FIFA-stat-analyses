import { create } from 'zustand';
import type { Player } from './types';

interface PlayerState {
  players: Player[];
  isLoading: boolean;
  error: string | null;
  compareList: Player[];
  savedSquad: Player[];
  removedPlayers: Player[];

  // Actions
  setPlayers: (players: Player[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addToCompare: (player: Player) => void;
  removeFromCompare: (playerId: number) => void;
  addToSquad: (player: Player) => void;
  removeFromSquad: (playerId: number) => void;
  addToRemoved: (player: Player) => void;
  restorePlayer: (playerId: number) => void;
  clearCompareList: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [],
  isLoading: false,
  error: null,
  compareList: [],
  savedSquad: [],
  removedPlayers: [],

  // Actions
  setPlayers: (players) => set({ players }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addToCompare: (player) => set((state) => ({
    compareList: state.compareList.find(p => p.id === player.id)
      ? state.compareList
      : [...state.compareList, player]
  })),

  removeFromCompare: (playerId) => set((state) => ({
    compareList: state.compareList.filter(p => p.id !== playerId)
  })),

  addToSquad: (player) => set((state) => ({
    savedSquad: state.savedSquad.find(p => p.id === player.id)
      ? state.savedSquad
      : [...state.savedSquad, player]
  })),

  removeFromSquad: (playerId) => set((state) => ({
    savedSquad: state.savedSquad.filter(p => p.id !== playerId)
  })),

  addToRemoved: (player) => set((state) => ({
    removedPlayers: state.removedPlayers.find(p => p.id === player.id)
      ? state.removedPlayers
      : [...state.removedPlayers, player]
  })),

  restorePlayer: (playerId) => set((state) => ({
    removedPlayers: state.removedPlayers.filter(p => p.id !== playerId)
  })),

  clearCompareList: () => set({ compareList: [] }),
})); 