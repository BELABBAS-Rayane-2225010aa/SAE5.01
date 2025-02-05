import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { Router } from '@thepassle/app-tools/router.js';
import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

// @ts-ignore
import { title } from '@thepassle/app-tools/router/plugins/title.js';

import './pages/app-home.js';

const baseURL: string = (import.meta as any).env.BASE_URL;

export const router = new Router({
    routes: [
      {
        path: resolveRouterPath(),
        title: 'Home',
        render: () => html`
        <app-navbar></app-navbar>
        <app-home></app-home>
        <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('about'),
        title: 'About',
        plugins: [
          lazy(() => import('./pages/app-about/app-about.js')),
        ],
        render: () => html`
        <app-navbar></app-navbar>
        <app-about></app-about>
        <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('epicerie-solidaire'),
        title: 'Epicerie Solidaire',
        plugins: [
          lazy(() => import('./pages/app-epicerie.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-epicerie></app-epicerie>
          <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('contact'),
        title: 'Contact',
        plugins: [
          lazy(() => import('./pages/app-contact.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-contact></app-contact>
          <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('login'),
        title: 'Login',
        plugins: [
          lazy(() => import('./pages/app-login.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-login></app-login>
          <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('administration'),
        title: 'Admin',
        plugins: [
          lazy(() => import('./pages/app-admin.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-admin></app-admin>
          <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('meteo'),
        title: 'Meteo',
        plugins: [
          lazy(() => import('./pages/app-meteo.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-meteo></app-meteo>
          <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('photovoltaique'),
        title: 'Panneaux photovoltaïques',
        plugins: [
          lazy(() => import('./pages/photovoltaique/app-solaire.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-solaire></app-solaire>
          <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('technologies'),
        title: 'Technologies',
        plugins: [
          lazy(() => import('./pages/app-technologie.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-technologie></app-technologie>
          <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('visualisation'),
        title: 'Vusualisation des panneaux photovoltaïques',
        plugins: [
          lazy(() => import('./pages/photovoltaique/app-visualisation.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-visualisation></app-visualisation>
          <app-footer></app-footer>`
      },
      {
        path: resolveRouterPath('evenements'),
        title: 'Evenements',
        plugins: [
          lazy(() => import('./pages/app-evenement.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-evenement></app-evenement>
          <app-footer></app-footer>`
      },
      {
        path : resolveRouterPath('event/:id'),
        title: 'Evenement',
        plugins: [
          lazy(() => import('./pages/app-eventDetail.js')),
        ],
        render: () => html`
          <app-navbar></app-navbar>
          <app-event-detail></app-event-detail>
          <app-footer></app-footer>`
      }
    ]
  });

  // This function will resolve a path with whatever Base URL was passed to the vite build process.
  // Use of this function throughout the starter is not required, but highly recommended, especially if you plan to use GitHub Pages to deploy.
  // If no arg is passed to this function, it will return the base URL.

  export function resolveRouterPath(unresolvedPath?: string) {
    var resolvedPath = baseURL;
    if(unresolvedPath) {
      resolvedPath = resolvedPath + unresolvedPath;
    }

    return resolvedPath;
  }