/**
 * Loads the newest official orders, circulars and news from SRA Brihanmumbai.
 * Existing HTML entries remain visible as a graceful offline fallback.
 */
(function () {
  'use strict';

  const ENDPOINTS = [
    '/api/sra-updates',
    'https://aquiretested-2.onrender.com/api/sra-updates',
  ];
  const MAX_ITEMS_PER_BOARD = 10;

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeUrl(value) {
    try {
      const url = new URL(value, window.location.href);
      return ['http:', 'https:'].includes(url.protocol)
        ? url.toString()
        : 'https://www.sra.gov.in/en';
    } catch {
      return 'https://www.sra.gov.in/en';
    }
  }

  function formatPublishedAt(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Published by SRA Brihanmumbai';

    const datePart = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(date).replace(/\//g, '-');
    const timePart = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }).format(date);
    return `Published on ${datePart} ${timePart}`;
  }

  function renderBoard(type, items) {
    const board = document.querySelector(`[data-bulletin-type="${type}"]`);
    const track = board?.querySelector('.bulletin-track');
    if (!track || !Array.isArray(items) || !items.length) return;

    track.innerHTML = items.slice(0, MAX_ITEMS_PER_BOARD).map((item) => {
      const detail = item.department || (item.number ? `Document no. ${item.number}` : 'SRA Brihanmumbai');
      return `
        <a href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer" class="bulletin-entry">
          <h4>${escapeHtml(item.title)}</h4>
          <p class="bulletin-meta">${escapeHtml(detail)}</p>
          <time datetime="${escapeHtml(item.publishedAt)}">${escapeHtml(formatPublishedAt(item.publishedAt))}</time>
        </a>
      `;
    }).join('');

    track.style.transform = 'translateY(0)';
    board.dataset.live = 'true';
  }

  async function requestUpdates(endpoint) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 16_000);
    try {
      const response = await fetch(endpoint, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Updates endpoint returned ${response.status}.`);
      return response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  }

  async function loadOfficialUpdates() {
    for (const endpoint of ENDPOINTS) {
      try {
        const data = await requestUpdates(endpoint);
        renderBoard('orders', data.orders);
        renderBoard('circulars', data.circulars);
        renderBoard('news', data.news);
        return;
      } catch (error) {
        console.warn(`Unable to load SRA updates from ${endpoint}:`, error);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', loadOfficialUpdates);
})();
