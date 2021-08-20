
const addTitle = (title) => {
	const siteTitle = document.querySelector('title');
	siteTitle.textContent = title;
}


const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames)
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		};
	}

	return element;
};

const createHeader = ({ title, header: { logo, social, menu } }) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (logo) {
		const logotype = getElement('img', ['logo'], {
			src: logo,
			alt: "Логотип " + title
		});
		wrapper.append(logotype);
	};

	if (menu) {
		const nav = getElement('nav', ['menu-list']);
		const menuLink = menu.map(item => {
			const navLink = getElement('a', ['menu-link'], { href: item.href });
			navLink.textContent = item.title;
			return navLink;
		})
		nav.append(...menuLink);
		wrapper.append(nav);

		const headerButton = getElement('button', ['menu-button']);

		container.append(headerButton);

		headerButton.onclick = () => {
			headerButton.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		}

	};

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], { src: item.image, alt: item.title }));

			socialLink.href = item.link;

			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	};

	container.append(wrapper);

	header.append(container);

	return header;
}

const createMain = ({ title, main: { genre, rating, description, trailer, slider } }) => {

	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);
	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], { textContent: genre });
		content.append(genreSpan);
	};

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'], { textContent: `${rating}/10` });


		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg',
			});
			ratingStars.append(star);
		};

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	};

	content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], { textContent: title }));

	if (description) {
		const descriptionElement = getElement('p', ['main-description', 'animated', 'fadeInRight'], { textContent: description });

		content.append(descriptionElement);
	};

	if (trailer) {
		const youtubeLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'],
			{
				href: trailer,
				textContent: 'Смотреть трейлер'
			}
		);
		const youtumeImageLink = getElement('a', ['play', 'youtube-modal'], { href: trailer, ariaLabel: 'Смотреть трейлер' });
		const youtubeIcon = getElement('img', ['play-img'], { src: 'img/play.svg', alt: 'play', ariaHidden: true });

		content.append(youtubeLink);
		wrapper.append(youtumeImageLink);
		youtumeImageLink.append(youtubeIcon);

	};

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWraper = getElement('div', ['swiper-wrapper']);
		const sliderButton = getElement('button', ['arrow']);

		const slides = slider.map(item => {
			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImg = getElement('img', ['card-img'], {
				src: item.img,
				alt: (item.title ? item.title + ' ' : '').trim() + (item.subtitle ? item.subtitle : '').trim()
			});
			card.append(cardImg);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				if (item.title) {
					let itemTitle = getElement('p', ['card-title'], { 'textContent': item.title });
					if (item.titleColor) { itemTitle.style.color = item.titleColor };
					cardDescription.append(itemTitle);
				};
				if (item.subtitle) {
					let itemSubtitle = getElement('p', ['card-subtitle'], { 'textContent': item.subtitle });
					if (item.titleColor) { itemSubtitle.style.color = item.titleColor }
					cardDescription.append(itemSubtitle);
				};
				card.append(cardDescription);
			}
			swiperSlide.append(card);
			return swiperSlide;
		});
		swiperWraper.append(...slides);
		swiperBlock.append(swiperWraper);
		sliderBlock.append(swiperBlock, sliderButton);


		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: sliderButton,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}

	return main;
}

const createFooter = ({ footer: { copyright, footerLink } }) => {
	const footer = getElement('footer', ['footer']);
	const footerContainer = getElement('div', ['container']);
	footer.append(footerContainer);
	const footerContent = getElement('div', ['footer-content']);
	footerContainer.append(footerContent);

	if (copyright) {
		const leftSide = getElement('div', ['left']);
		const copySpan = getElement('span', ['copyright'], { textContent: copyright });
		leftSide.append(copySpan);
		footerContent.append(leftSide);
	};
	if (footerLink) {
		const rightSide = getElement('div', ['right']);
		const rightNav = getElement('nav', ['footer-menu']);
		const footerLinks = footerLink.map(item => {
			const footerLink = getElement('a', ['footer-link'], { textContent: item.linkText, href: item.href });
			return footerLink;
		});
		rightSide.append(rightNav);
		rightNav.append(...footerLinks);
		footerContent.append(rightSide);
	};

	return footer;
}

const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');
	app.style.backgroundImage = options.background ? `url(${options.background})` : '';

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';
	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	if (options.title) {
		addTitle(options.title);
	};

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const favicon = getElement('link', null, {
			rel: "shortcut icon",
			href: options.favicon,
			type: 'image/' + type === 'svg' ? 'svg-xml' : 'type'
		});
		document.querySelector('head').append(favicon);
	}

	if (options.header) {
		app.append(createHeader(options));
	};

	if (options.main) {
		app.append(createMain(options));
	};

	if (options.footer) {
		app.append(createFooter(options));
	}

};

movieConstructor('.app', {
	title: 'Джентельмены',
	favicon: null,
	background: 'images/Gentelmens_poster.jpg',
	fontColor: '#8F793F',
	backgroundColor: '#ffffff',
	subColor: '#8F793F',
	header: {
		logo: null,
		social: [
			{ title: 'Twitter', link: 'https://twitter.com', image: 'images/social/twitter.svg' },
			{ title: 'Instagram', link: 'http://instagram.com', image: 'images/social/instagram.svg' },
			{ title: 'Facebook', link: 'http://facebook.com', image: 'images/social/facebook.svg' },
		],
		menu: [
			{
				title: 'Описание',
				href: '#',
			},
			{
				title: 'Трейлер',
				href: '#',
			},
			{
				title: 'Отзывы',
				href: '#',
			},
		],
	},
	main: {
		genre: '2020,криминал, комедия, боевик',
		rating: 9,
		description: `Один ушлый американец ещё со студенческих лет приторговывал наркотиками,
			а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской
			аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца,
			 и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей
			лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.`,
		trailer: 'https://www.filmpro.ru/materials/70484',
		slider: [
			{ img: 'images/acters/Charlie_Hunnam.jpg', title: 'В роли Рэя', subtitle: 'Чарли Ханнэм', titleColor: '#8F793F' },
			{ img: 'images/acters/Colin_Farrell.jpg', title: 'В роли тренера', subtitle: 'Коллин Фаррел', titleColor: '#8F793F' },
			{ img: 'images/acters/Genrie_Golding.jpg', title: 'В роли сухого глаза', subtitle: 'Генри Голдинг', titleColor: '#8F793F' },
			{ img: 'images/acters/Hew_Grant.jpg', title: 'В роли Флетчера', subtitle: 'Хью Грант', titleColor: '#8F793F' },
			{ img: 'images/acters/Matthew_McConaughey.jpg', title: 'В роли Микки Пирсона', subtitle: 'Мэтью Макконахи', titleColor: '#8F793F' },
			{ img: 'images/acters/Michelle_Dockery.jpg', title: 'В роли Розалинды Пирсон', subtitle: 'Мишель Докери', titleColor: '#8F793F' }
		]
	},
	footer: {
		copyright: '© 2020 The Gentelmens. All right reserved.',
		footerLink: [
			{ linkText: 'Privacy Policy', href: '#' },
			{ linkText: 'Terms of Service', href: '#' },
			{ linkText: 'Legal', href: '#' },
		]
	}
});