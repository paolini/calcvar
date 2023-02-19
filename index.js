main()

function main() {
    const numbering = {}
    const labels = {}

    function getNumber(name, context) {
        if (!numbering[name]) numbering[name] = 0
        numbering[name]++
        return numbering[name]
    }

    function expandTheorems() {
        // take all <p> with class "theorem"
        // and add a <b>Teorema</b> as initial text
        // if <p> has a "name" property, then add 
        // then enclose the name between parentheses
        const classes = {
            theorem: {title: "Teorema"},
            lemma: {title: "Lemma", numbering: 'theorem'},
            corollary: {title: "Corollario", numbering: 'theorem'},
            proposition: {title: "Proposizione", numbering: 'theorem'},
            definition: {title: "Definizione", numbering: 'theorem'},
            example: {title: "Esempio", numbering: 'theorem'},
            remark: {title: "Osservazione", numbering: 'theorem'},
            exercise: {title: "Esercizio", numbering: 'theorem'},
            proof: {title: "Dimostrazione", proofType: true},
            problem: {title: "Problema", numbering: 'theorem'},
        }

        document
            .querySelectorAll(Object.keys(classes).map(x => `p.${x}`).join(','))
            .forEach(theorem => {
                // find the class of the theorem among all the classes
                const className = theorem.className.split(' ').find(x => classes[x])
                const options = classes[className]
                const title = options.title
                const numberName = options.numbering || className
                let text = theorem.innerHTML
                let myTitle = title 
                const name = theorem.getAttribute("name")
                if (options.proofType) {
                    if (name) myTitle = name
                    theorem.innerHTML = `<i>${myTitle}.</i> ${text}`
                } else { 
                    const number = getNumber(numberName)
                    // store the number of the theorem in the label
                    // named in attribute "label"
                    const label = theorem.getAttribute("label")
                    // check if the label is already used
                    if (label && labels[label]) {
                        console.log(`Label ${label} duplicated`)
                    }
                    if (label) labels[label] = `${myTitle}&nbsp;${number}`

                    myTitle = `<b>${myTitle} ${number}</b>`
                    if (name) myTitle = `${myTitle} (${name})`
                    theorem.innerHTML = `${myTitle}<b>.</b> ${text}`
                }
        })

        // expand all spans with class "ref"
        document
            .querySelectorAll('span.ref')
            .forEach(span => {
                const label = span.getAttribute("label")
                const value = labels[label]
                if (value) {
                    span.innerHTML = value
                } else {
                    console.log(`Label ${label} not found`)
                }
            })
    }

    expandTheorems()
}

function myRender() {
    console.log(`myRender() called`)
    // • renderMathInElement() is a function from KaTeX
    renderMathInElement(document.body, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
        ],
        throwOnError : false,
        macros: {
            "\\RR": "\\mathbb{R}",
            "\\ZZ": "\\mathbb{Z}",
            "\\CC": "\\mathbb{C}",
            "\\QQ": "\\mathbb{Q}",
            "\\NN": "\\mathbb{N}",
            "\\F": "\\mathcal{F}",
            "\\M": "\\mathcal{M}",
            "\\P": "\\mathcal{P}",
            "\\phi": "\\varphi",
            "\\eps": "\\varepsilon",
            "\\enclose": "\\left(#1\\right)",
            "\\Enclose": "\\left[#1\\right]",
            "\\ENCLOSE": "\\left\\{#1\\right\\}",
            "\\abs": "\\left\\lvert#1\\right\\rvert",
        }
      });
}

