# laravel-validator-js

### Powerful Laravel-like validation for JavaScript – Quick, consistent, and easy to use.

`laravel-validator-js` is a JavaScript package that brings Laravel's powerful validation rules to the frontend. With this package, you can validate user input instantly using the same rules applied at the backend, ensuring consistency and reducing unnecessary server requests. This helps save bandwidth and improves the user experience by catching validation errors in real-time.

The package supports **92 out of Laravel's 104** validation rules, covering all rules that modern browsers can handle. It also provides the flexibility to define custom rules and messages, and supports validating nested attributes, just like Laravel.

---

## Installation

You can install `laravel-validator-js` via npm or yarn.

**Using npm:**
```bash
npm install laravel-validator-js
```

**Using yarn:**
```bash
yarn add laravel-validator-js
```

Once installed, import and use it in your JavaScript files:
```js
import Validator from 'laravel-validator-js';
```

---

## Usage

### Instantiating the Validator

The `Validator` constructor accepts four parameters:

```js
new Validator(input, rules, messages?, attributes?);
```

- **`input`** (required): Accepts `FormData | HTMLFormElement | Record<string, any> | any[]`
- **`rules`** (required):
    ```js
    {
        [key: string]: string|(attribute:string, value:any, fail:(message:string)=>void) => void|(string|(attribute:string, value:any, fail:(message:string)=>void) => void)[];
    }
    ```
- **`messages`** (optional): Custom error messages `{[key: string]: string;}`
- **`attributes`** (optional): Attribute names for fields `{[fieldName: string]: string}`

### Example Usage
<!-- $insert Basic Example -->

#### Inline Rule Method
```js
new Validator(input, {
    'name': (key, value, fail) => {
        if (value.length > 60) fail(`${key} field shouldn't be more than 60 characters`);
    },
    'image.*': ['file', 'image', (key, value, fail) => {
        if (value.size > 6000) fail(`${key} field shouldn't be more than 6KB`);
    }]
});
```

#### Conditional Validation
```js
validator.sometimes('email', 'required|email', (input) => {
    return input.signup_with_email === true;
});
```

#### Conditional Array Validation
```js
const input = [
    'channels': {
        {
            'type': 'email',
            'address': 'abigail@example.com',
        },
        {
            'type': 'url',
            'address': 'https://example.com',
        }
    }
];

validator.sometimes('channels.*.address', 'email', (input, item)=>{
    return item.type === 'email';
});

validator.sometimes('channels.*.address', 'url', (input, item)=>{
    return item.type === 'url';
});
```
#### Performing Additional Validation
```js
validator.after((validator) => {
    validator.errors.add(fieldName, message);
    // other things...
});
```

### Stop on First Validation Failure
Using `bail` to stop validation of other rules if one fails:

```js
const validator = new Validator(data, {
    'profile_picture': 'file|bail|image|dimensions:min_width=100,min_height=200'
});
```

Stopping validation of all fields if one field fails:

```js
validator.stopOnFirstFailure();
const messages = await validator.messages();
```

### Retrieve applied rules and input data
```js
const data = validator.getData();
const rules = validator.getRules();

```

---

## Working with Error Messages

### Retrieving Error Messages

```js
await validator.messages(); // Alternative: `await validator.errors.all()`
```

### Example Error Message Format

```json
{
    "team_name": [
        "The team name must be a string.",
        "The team name must be at least 1 characters."
    ],
    "authorization.role": [
        "The selected authorization.role is invalid."
    ],
    "users.0.email": [
        "The users.0.email field is required."
    ],
    "users.2.email": [
        "The users.2.email must be a valid email address."
    ]
}
```

### Available Methods on `validator.errors`

- **Get first message:**
  ```js
  await validator.errors.first(fieldName?);
  ```
- **Get messages of a specific field:**
  ```js
  await validator.errors.get(fieldName);
  ```
- **Get all messages:**
  ```js
  await validator.errors.all();
  ```
- **Add a message:**
  ```js
  await validator.errors.add(fieldName, message);
  ```
- **Merge messages:**
  ```js
  await validator.errors.merge(messages);
  ```

### Retrieving Validated Data

Unlike Laravel's `$validator->validated()`, this package does not provide a direct validated method. Instead, you can manually filter valid fields after using the `validator.errors.all()` method.

### Working with Validation Status

```js
const isValidationPassed = await validator.passes();
const isValidationFailed = await validator.fails();
```

---

## Supported Validation Rules

This package supports most of Laravel's validation rules, with a few exceptions:

### Unsupported Rules

- `current_password` - Requires backend authentication to validate the user's password.
- `date_format` - Relies on PHP's date() function which is not available in JavaScript.
- `enum` - Enum validation in Laravel is based on PHP's enum class, which has no direct equivalent in JavaScript.
- `exclude`
    - `exclude_if:anotherfield,value`
    - `exclude_unless:anotherfield,value`
    - `exclude_with:anotherfield`
    - `exclude_without:anotherfield`
- `exists:table,column` - Requires database connectivity which isn't possible in the frontend.
- `mimes:foo,bar,...` - Browser-side file reading can't determine the actual mime type reliably.
- `timezone` - JavaScript doesn't have a comprehensive timezone validation mechanism.
- `unique:table,column` - Requires server-side database validation.

### Specific Rule Behaviors

**active_url**
- It uses `URL API` to validate field value is a URL or not.
- It doesn't validate A or AAAA records due to browser restrictions.

**after:date**
- If value is an invalid date, it checks if the named field exists in the form and compares its value.
- It uses `Date API` to convert string to date.
- It doesn't support relative dates like Laravel using `strtotime`.
- If other value or field is `Invalid Date`, it always returns true.
- If the field under validation is `Invalid Date`, it always returns false.

**after_or_equal:date**
- Same behavior as `after:date`.

**array**
- Returns true for both `[]` and `{}` similar to PHP arrays.
- Laravel considers both associative and indexed arrays as "arrays", and so does this package in JavaScript.
- Additional values require each key in the input array to match provided values.

**before:date**
- Same behavior as `after:date`.

**before_or_equal:date**
- Same behavior as `after:date`.

**email**
- Doesn't support `dns, filter`.
- Supports only `rfc, strict, spoof, filter_unicode`.

**file**
- Checks if the field value is an instance of `File`.

**mimetypes**
- Unlike Laravel, it doesn't read files to determine mimetypes, but checks `File.type`.

For more details on Laravel's validation rules, refer to the official documentation: [Laravel Validation Docs](https://laravel.com/docs/11.x/validation)

---

## Custom Validation Rules

Adding custom validation rules is straightforward:

```js
// Optional message with a placeholder :attribute for field name.
const message = ':attribute field is invalid.';

Validator.addCustomRule('min_length', (fieldName, value, ruleParams, validator) => {
    return value.length >= ruleParams[0];
}, message);

const validator = new Validator({ username: 'abc' }, { username: 'min_length:5' });
```

---

## Future Enhancements

- **Enhanced File Validation**: Support for content-based validation.
- **Additional Rules**: Expanding support for more Laravel rules.
- **Flexible Custom Rules**: Improved extensibility for complex validation needs.

---

## Contributing
Contributions, issues, and feature requests are welcome!

---

## License
`laravel-validator-js` is open-source and licensed under the [MIT License](./LICENSE).