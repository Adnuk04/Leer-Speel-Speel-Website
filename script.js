(function () {
    'use strict';

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Mobile nav ---------- */
    var navToggle = document.getElementById('navToggle');
    var primaryNav = document.getElementById('primaryNav');

    function closeNav() {
        if (!navToggle || !primaryNav) return;
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
    }

    function openNav() {
        if (!navToggle || !primaryNav) return;
        navToggle.setAttribute('aria-expanded', 'true');
        primaryNav.classList.add('is-open');
    }

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', function () {
            var expanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeNav();
            } else {
                openNav();
            }
        });

        primaryNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });

        document.addEventListener('click', function (event) {
            if (navToggle.getAttribute('aria-expanded') !== 'true') return;
            if (primaryNav.contains(event.target) || navToggle.contains(event.target)) return;
            closeNav();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                closeNav();
                navToggle.focus();
            }
        });
    }

    /* ---------- Gallery lightbox ---------- */
    var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
    var lightbox = document.getElementById('lightbox');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');
    var currentIndex = 0;
    var lastFocusedTrigger = null;

    function showItem(index) {
        if (!galleryItems.length) return;
        currentIndex = (index + galleryItems.length) % galleryItems.length;
        var item = galleryItems[currentIndex];
        var caption = item.getAttribute('data-caption') || 'Photo';
        var file = item.getAttribute('data-file');
        if (lightboxCaption) lightboxCaption.textContent = caption;
        if (lightboxImage && file) {
            lightboxImage.src = file;
            lightboxImage.alt = item.querySelector('img') ? item.querySelector('img').alt : caption;
        }
    }

    function openLightbox(index, trigger) {
        if (!lightbox) return;
        lastFocusedTrigger = trigger || null;
        showItem(index);
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        if (lightboxPrev) lightboxPrev.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.style.overflow = '';
        if (lastFocusedTrigger) lastFocusedTrigger.focus();
    }

    galleryItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            openLightbox(index, item);
        });
    });

    if (lightbox) {
        lightbox.querySelectorAll('[data-close]').forEach(function (el) {
            el.addEventListener('click', closeLightbox);
        });

        if (lightboxPrev) lightboxPrev.addEventListener('click', function () { showItem(currentIndex - 1); lightboxPrev.focus(); });
        if (lightboxNext) lightboxNext.addEventListener('click', function () { showItem(currentIndex + 1); lightboxNext.focus(); });

        document.addEventListener('keydown', function (event) {
            if (lightbox.hidden) return;
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                showItem(currentIndex - 1);
            } else if (event.key === 'ArrowRight') {
                showItem(currentIndex + 1);
            } else if (event.key === 'Tab') {
                var focusable = lightbox.querySelectorAll('button');
                if (!focusable.length) return;
                var first = focusable[0];
                var last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }

    /* ---------- Enquiry form (opens the visitor's email app; nothing is sent automatically) ---------- */
    var enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var parentName = document.getElementById('parentName').value.trim();
            var childName = document.getElementById('childName').value.trim();
            var message = document.getElementById('enquiryMessage').value.trim();

            var bodyLines = [
                'Parent/guardian name: ' + parentName,
                childName ? 'Child\'s name: ' + childName : null,
                '',
                message
            ].filter(function (line) { return line !== null; });

            var subject = encodeURIComponent('Enrolment Enquiry - Leer Speel-Speel');
            var body = encodeURIComponent(bodyLines.join('\n'));

            // TEMPORARY (demo testing): routes to Sean's inbox so the flow can be tested end to end.
            // Change back to potgieter@iway.na before handing the site over to the school.
            window.location.href = 'mailto:seanchembe@gmail.com?subject=' + subject + '&body=' + body;
        });
    }
})();
