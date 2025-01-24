import Validator from "../dist/index.js";

function onfilechange(file) {
    const input = {
        'terms': 'no',
        a: [
            "hello",
            "gillo",
            "challo"
        ],
        'data': 'hiello',
        'data_dup': {'1':'hi'},
        'datas': [
            'http://google.com',
            '00-B0-D0-63-C2-26',
            null,
            '6'
        ],
        'goat': {
            '0': '15.6'
        },
        file
    };

    const rules = {
        // 'goat': 'contains:hi_jack,hello',s
        // 'data':'url',
        // 'datas.*': 'url:http',
        'file': [
            'image',
            'dimensions:min_width=100,min_height=200',
            'extensions:jpg,jpeg,zips',
            'min:15000'
        ]
        // 'goat': 'list'
        // 'datas.*': 'filled:o,com',
    };

    const customMessages = {
        // 'a.*.accepted': 'hello world',
        // 'a.0.accepted': 'hello world is it going',
    };

    const customAttributes = {
        // 'a.*': 'apple'
    };

    const validator = Validator.make(input, rules, customMessages, customAttributes);

    window.validator = validator;

    Validator.addCustomRule('isnumber-custom', (attribute, value, params) => {
        return Number(value);
    });

    validator.setRules({
        ...validator.getRules(),
    });

    // validator.sometimes('cat.*', 'array', (input, item)=>{
    //     return input.hi == 'hello';
    // });

    console.log({data: validator.getData(), rules: validator.getRules()});

    (async () => {
        output.innerHTML = JSON.stringify(await validator.messages(), null, '\t');
    })();
}

fileInput.onchange = () => {
    onfilechange(fileInput.files[0] || undefined);
}