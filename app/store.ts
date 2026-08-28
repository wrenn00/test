"use client";

import { useSyncExternalStore } from "react";
import { BASE_PLANS, type Plan } from "./home/types";

type State = { plans: Plan[]; recorded: boolean };

let state: State = { plans: BASE_PLANS, recorded: false };
const listeners = new Set<() => void>();

function emit() {
  state = { ...state };
  listeners.forEach((l) => l());
}

export const store = {
  get: () => state,
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  setPlans(plans: Plan[]) {
    state.plans = plans;
    emit();
  },
  addPlan(p: Plan) {
    state.plans = [...state.plans, p];
    emit();
  },
  updatePlan(name: string, next: Partial<Plan>) {
    state.plans = state.plans.map((p) => (p.name === name ? { ...p, ...next } : p));
    emit();
  },
  removePlan(name: string) {
    state.plans = state.plans.filter((p) => p.name !== name);
    emit();
  },
  toggleDone(name: string) {
    state.plans = state.plans.map((p) => (p.name === name ? { ...p, done: !p.done } : p));
    state.recorded = state.plans.some((p) => p.done);
    emit();
  },
  /** 기록 저장: 계획에 있으면 완료 처리, 없으면 완료된 항목으로 추가 */
  record(name: string, minutes: number) {
    const has = state.plans.some((p) => p.name === name);
    state.plans = has
      ? state.plans.map((p) => (p.name === name ? { ...p, done: true, sub: `${minutes}분` } : p))
      : [...state.plans, { name, sub: `${minutes}분`, done: true }];
    state.recorded = true;
    emit();
  },
  reset() {
    state = { plans: BASE_PLANS, recorded: false };
    emit();
  },
};

export function useStore() {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}
