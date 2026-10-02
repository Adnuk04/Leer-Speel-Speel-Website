(function () {
    'use strict';

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Logo: scroll to top ----------
       The header is position:sticky, so its own bounding box is always at
       y=0 once stuck — the browser's native #top anchor jump sees it as
       "already in view" and does nothing. Scroll explicitly instead. */
    var wordmark = document.querySelector('.wordmark');
    if (wordmark) {
        wordmark.addEventListener('click', function (event) {
            event.preventDefault();
            var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

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

    /* ---------- Nav: highlight the section in view ---------- */
    if (primaryNav && 'IntersectionObserver' in window) {
        var navLinks = Array.prototype.slice.call(primaryNav.querySelectorAll('.primary-nav-list a[href^="#"]'));
        var navLinkFor = {};
        navLinks.forEach(function (link) { navLinkFor[link.getAttribute('href').slice(1)] = link; });

        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var current = navLinkFor[entry.target.id];
                navLinks.forEach(function (link) { link.classList.toggle('is-current', link === current); });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        document.querySelectorAll('main > section').forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    /* ---------- Gallery albums (pop-up) ----------
       Album cards open a pop-up over the page showing that album's photos.
       The URL hash (#album-<name>) mirrors the open album, so shared links and
       the Back button work. Without JS the albums render inline in #gallery. */
    var gallery = document.getElementById('gallery');
    var albumModal = document.getElementById('albumModal');
    var albumModalBody = document.getElementById('albumModalBody');
    var albums = gallery ? Array.prototype.slice.call(gallery.querySelectorAll('.album')) : [];

    if (gallery && albumModal && albumModalBody && albums.length) {
        var albumPanel = albumModal.querySelector('.album-modal-panel');
        var albumTabs = Array.prototype.slice.call(albumModal.querySelectorAll('.album-tab'));
        var openAlbum = null;
        var openedFromPage = false;
        var albumReturnFocus = null;

        var albumById = function (id) {
            return albums.filter(function (album) { return album.id === id; })[0] || null;
        };

        albums.forEach(function (album) {
            var count = album.querySelectorAll('.gallery-item').length;
            var label = count === 0 ? 'Photos coming soon' : count + (count === 1 ? ' photo' : ' photos');
            document.querySelectorAll('[data-album-count="' + album.id + '"]').forEach(function (el) {
                el.textContent = label;
            });

            // Give each album header a small copy of its card's illustration
            var cardArt = gallery.querySelector('.album-art[href="#' + album.id + '"] svg');
            var head = album.querySelector('.album-head');
            if (cardArt && head) {
                var art = document.createElement('span');
                art.className = 'album-head-art';
                art.setAttribute('aria-hidden', 'true');
                art.appendChild(cardArt.cloneNode(true));
                head.insertBefore(art, head.firstChild);
            }

            albumModalBody.appendChild(album);
        });
        var albumViews = gallery.querySelector('.album-views');
        if (albumViews) albumViews.parentNode.removeChild(albumViews);

        var showAlbum = function (album) {
            albums.forEach(function (a) { a.classList.toggle('is-active', a === album); });
            albumTabs.forEach(function (tab) {
                var isCurrent = tab.getAttribute('href') === '#' + album.id;
                tab.classList.toggle('is-current', isCurrent);
                if (isCurrent) tab.setAttribute('aria-current', 'true');
                else tab.removeAttribute('aria-current');
            });

            var title = album.querySelector('h3');
            if (title) albumPanel.setAttribute('aria-labelledby', title.id);
            albumModalBody.scrollTop = 0;

            if (!openAlbum) {
                albumReturnFocus = gallery.querySelector('.album-btn[href="#' + album.id + '"]');
                albumModal.hidden = false;
                document.body.style.overflow = 'hidden';
            }
            openAlbum = album;
            if (title) title.focus({ preventScroll: true });
        };

        var hideAlbum = function () {
            if (!openAlbum) return;
            openAlbum = null;
            openedFromPage = false;
            albumModal.hidden = true;
            document.body.style.overflow = '';
            if (albumReturnFocus) albumReturnFocus.focus({ preventScroll: true });
        };

        // X, backdrop, Esc and "All albums" all land back on the page with the album cards.
        var closeAlbum = function () {
            if (!openAlbum) return;
            if (openedFromPage) {
                history.back(); // undo the #album-… history entry; hashchange then hides the pop-up
            } else {
                // Arrived via a shared link: there's no page entry to go back to
                history.replaceState(null, '', window.location.pathname + window.location.search + '#gallery');
                hideAlbum();
                var picker = gallery.querySelector('.album-picker');
                if (picker) picker.scrollIntoView({ block: 'center' });
            }
        };

        var syncAlbumToHash = function () {
            var album = albumById(window.location.hash.slice(1));
            if (album) showAlbum(album);
            else hideAlbum();
        };

        gallery.querySelectorAll('a[href^="#album-"]').forEach(function (link) {
            link.addEventListener('click', function () { openedFromPage = true; });
        });

        // Switching albums inside the pop-up replaces the history entry instead of stacking them
        albumTabs.forEach(function (tab) {
            tab.addEventListener('click', function (event) {
                var album = albumById(tab.getAttribute('href').slice(1));
                if (!album) return;
                event.preventDefault();
                history.replaceState(null, '', '#' + album.id);
                showAlbum(album);
            });
        });

        albumModal.querySelectorAll('[data-album-close], .album-back').forEach(function (el) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                closeAlbum();
            });
        });

        document.addEventListener('keydown', function (event) {
            if (!openAlbum) return;
            var lightboxEl = document.getElementById('lightbox');
            if (lightboxEl && !lightboxEl.hidden) return; // the photo lightbox handles its own keys

            if (event.key === 'Escape') {
                closeAlbum();
            } else if (event.key === 'Tab') {
                var focusable = Array.prototype.slice.call(albumPanel.querySelectorAll('a[href], button')).filter(function (el) {
                    return el.getClientRects().length > 0;
                });
                if (!focusable.length) return;
                var first = focusable[0];
                var last = focusable[focusable.length - 1];
                if (event.shiftKey && (document.activeElement === first || !albumPanel.contains(document.activeElement))) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });

        window.addEventListener('hashchange', syncAlbumToHash);
        syncAlbumToHash();
    }

    /* ---------- Gallery lightbox ----------
       Each [data-gallery-group] (the preview, or one album) is its own set:
       prev/next and the counter only move through the group that was clicked. */
    var lightbox = document.getElementById('lightbox');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var lightboxCounter = document.getElementById('lightboxCounter');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxVisual = document.getElementById('lightboxVisual');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');
    var activeItems = [];
    var currentIndex = 0;
    var lastFocusedTrigger = null;

    function showItem(index) {
        if (!activeItems.length) return;
        currentIndex = (index + activeItems.length) % activeItems.length;
        var item = activeItems[currentIndex];
        var caption = item.getAttribute('data-caption') || 'Photo';
        var file = item.getAttribute('data-file');
        if (lightboxCaption) lightboxCaption.textContent = caption;
        if (lightboxCounter) {
            lightboxCounter.textContent = activeItems.length > 1 ? (currentIndex + 1) + ' / ' + activeItems.length : '';
        }
        if (lightboxImage && file) {
            lightboxImage.src = file;
            lightboxImage.alt = item.querySelector('img') ? item.querySelector('img').alt : caption;
        }
    }

    function openLightbox(trigger) {
        if (!lightbox) return;
        var group = trigger.closest('[data-gallery-group]') || document;
        activeItems = Array.prototype.slice.call(group.querySelectorAll('.gallery-item'));
        lastFocusedTrigger = trigger;

        var isSingle = activeItems.length < 2;
        if (lightboxPrev) lightboxPrev.hidden = isSingle;
        if (lightboxNext) lightboxNext.hidden = isSingle;

        showItem(activeItems.indexOf(trigger));
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        var firstFocus = isSingle ? lightbox.querySelector('.lightbox-close') : lightboxPrev;
        if (firstFocus) firstFocus.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        // Keep the page locked if the lightbox was opened from inside the album pop-up
        var albumStillOpen = document.querySelector('.album-modal:not([hidden])');
        document.body.style.overflow = albumStillOpen ? 'hidden' : '';
        if (lastFocusedTrigger) lastFocusedTrigger.focus();
    }

    document.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {
            openLightbox(item);
        });
    });

    if (lightbox) {
        lightbox.querySelectorAll('[data-close]').forEach(function (el) {
            el.addEventListener('click', closeLightbox);
        });

        if (lightboxPrev) lightboxPrev.addEventListener('click', function () { showItem(currentIndex - 1); lightboxPrev.focus(); });
        if (lightboxNext) lightboxNext.addEventListener('click', function () { showItem(currentIndex + 1); lightboxNext.focus(); });

        // Swipe left/right on touch screens
        if (lightboxVisual) {
            var touchStartX = null;
            var touchStartY = null;
            lightboxVisual.addEventListener('touchstart', function (event) {
                if (event.touches.length !== 1) return;
                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
            }, { passive: true });
            lightboxVisual.addEventListener('touchend', function (event) {
                if (touchStartX === null) return;
                var dx = event.changedTouches[0].clientX - touchStartX;
                var dy = event.changedTouches[0].clientY - touchStartY;
                touchStartX = null;
                if (activeItems.length > 1 && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                    showItem(currentIndex + (dx < 0 ? 1 : -1));
                }
            });
        }

        document.addEventListener('keydown', function (event) {
            if (lightbox.hidden) return;
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                showItem(currentIndex - 1);
            } else if (event.key === 'ArrowRight') {
                showItem(currentIndex + 1);
            } else if (event.key === 'Tab') {
                var focusable = lightbox.querySelectorAll('button:not([hidden])');
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

    /* ---------- Enquiry form ----------
       TEMPORARY (demo only): opens Gmail's web compose in a new tab, addressed
       to Sean's inbox, instead of a mailto: link (which was launching Outlook
       or whatever the OS default mail app happened to be). Nothing is sent
       automatically. Before handing the site over to the school, switch this
       back to a plain mailto: link addressed to potgieter@iway.na so it works
       regardless of which email provider or app the visitor uses. */
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

            var gmailComposeUrl = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=seanchembe@gmail.com&su=' + subject + '&body=' + body;
            window.open(gmailComposeUrl, '_blank', 'noopener');
        });
    }
})();
