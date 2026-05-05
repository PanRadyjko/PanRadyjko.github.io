interface StyleDefinition {
    name: string;
    file: string;
}

const styles: StyleDefinition[] = [
    { name: 'Styl 1', file: '/style-1.css' },
    { name: 'Styl 2', file: '/style-2.css' },
    { name: 'Styl 3', file: '/style-3.css' }
];

const zmianaStylu = (fileName: string): void => {
    const oldLink = document.getElementById('dynamic-style');

    if (oldLink) {
        oldLink.remove();
    }

    const newLink = document.createElement('link');
    newLink.id = 'dynamic-style';
    newLink.rel = 'stylesheet';
    newLink.href = fileName;

    document.head.appendChild(newLink);
};

const generujPrzyciski = (): void => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const container = document.createElement('div');
    container.className = 'style-switcher';
    container.style.marginTop = '15px';

    styles.forEach((style) => {
        const btn = document.createElement('button');
        btn.innerText = style.name;
        btn.style.margin = '0 5px';

        btn.addEventListener('click', () => zmianaStylu(style.file));

        container.appendChild(btn);
    });

    footer.appendChild(container);
};

document.addEventListener('DOMContentLoaded', () => {
    generujPrzyciski();
    if (styles.length > 0) {
        zmianaStylu(styles[0].file);
    }
});