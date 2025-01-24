# accepted
- true
    - value => "yes", "on", 1, "1", true, or "true"
- false
    - not-exist

# accepted_if
- params

- true
    - value => "yes", "on", 1, "1", true, or "true"
- false
    - field-not-exist
- condition
    Even spaces and empty string are considered while comparison.
    - true
        - matchs data
            - loose comparison
                - 'data' == 'data'
                - 10 == '10'
                - null == 'null'
                - true == 'true'
                - false == 'false'
        - In the _if rule, another field can be specified as user.0.image but not as user.*.image (using a wildcard), as the latter will always return false.
            E.g.
                user.0.image // ok
                user.*.image // not ok (retuns false)
    - false
        - anotherfield-not-exist
        - anotherfield returns multivalue (when using a wildcard)
            E.g. user.*.image
        - [] != ('' or '[]', '0', 'null', 'false')
- message
    The :attribute field must be accepted when :other is :value.


- exception
    - parameters < 2


# active_url
- true
    - `var(empty)`
- false
    - empty array
    - null
    - 0
    - Can't parse url using `URL API`

- Laravel
- Checks A or AAAA record according to the `dns_get_record` PHP function.
- The hostname of the provided URL is extracted using the parse_url PHP function before being passed to dns_get_record.

## Javascript
- Parses hostname of the provided URL using `new URL() API`
- For now it's not checking A or AAAA records.

# alpha
- true
    - field-not-exist
    - empty/space-only string
- false
    - empty array
    - null
    - 0

# alpha_dash
0 is true because it is converted to string and validated as \p{N}
- true
    - `var(empty)`
- false
    - empty array
    - null

# alpha_num
0 is true because it is converted to string and validated as \p{N}
- true
    - `var(empty)`
- false
    - empty array
    - null

# array
- true
    - `var(empty)`
- false
    - null
    - 0
- condition
    Even if the params is empty string, then also it checks if the each key in the input array must be present within te list of values.

# ascii
- Note:
    - Numbers are converted to string
- true
    - null
- false
- Laravel
- if value is `array` then it throws an error `Array to string conversion`

If not asking

# between:min,max

- true
    - `var(empty)`
- false
    - null
- condition
    - `min` and `max` are considered as valid if they are not `NaN` after passing to `Number`
    - valid: '   5   '
    - invalid: '5 2' & '5g' & 'g5'
- exception
    - params length less than 2
        - Validation rule between requires at least 2 parameters.
    - Invalid `Number` to min or max
        - First it checks min is valid if not it throws an error.
        - else, if `min` is valid number it checks value validates with min. if not validates it returns false. if validates it goes to check `max`
        - if `max` is invalid `Number` it throws an error. otherwise it validates.

# boolean
- true
    - `var(empty)`
- false
    - if value is string 'true' or 'false'
    - null

# confirmed
- true
    - `var(empty)`
    - ('' === '   ' (empty string) === null) === undefined (another field)
        - when another field `undefined` then field is valid even if field-value is empty/space-only string null
- false


    <!-- - when field value is not !undefined or '' or '   ' or null -->

# conatins:foo,bar,...
- paramsLength
    - >= 0
- true
    - `var(empty)`
    <!-- - 'true' === true & 'false' === false -->
    - '0' === 0
- false
    - null
    - false
    - 0
    - !array
- bug
    - when array contains `true` then it is always true; because `true` === 'any string'.
    - also `false` === 'empty string` (When params is empty-string and if array contains false it retuns valid always)

# current_password
------- Not Provided -------- As it's only possible at backend

# decimal:min,max
- true
    - `var(empty)`
- false
    - null
    - []
- paramsLength
    - >= 1
- params
    - `var(min-max)`
- exception
    - if params is undefined
        - Validation rule decimal requires at least 1 parameters.

# declined
- Note:
    - field is always reqired
- true
    - value => "no", "off", 0, "0", false, or "false"
- false
    - not-exist

# declined_if:anotherfield,value,...
- Note:
    - empty-string or null is not equals to undefined like `confirmed`
- true
    - value => "no", "off", 0, "0", false, or "false"
- false
    - field-not-exist
- condition
    Even spaces and empty string are considered while comparison.
    - true
        - matchs data
            - loose comparison
                - 'data' == 'data'
                - 10 == '10'
                - null == 'null'
                - true == 'true'
                - false == 'false'
        - In the _if rule, another field can be specified as user.0.image but not as user.*.image (using a wildcard), as the latter will always return false.
            E.g.
                user.0.image // ok
                user.*.image // not ok (retuns false)
    - false
        - anotherfield-not-exist
        - anotherfield returns multivalue (when using a wildcard)
            E.g. user.*.image
        - [] != ('' or '[]', '0', 'null', 'false')
- message
    The :attribute field must be accepted when :other is :value.


- exception
    - parameters < 2

# different:field
- paramsLength
    - >= 1 (but it won't throw error if 0 params passed when input value is `undefined` && `!value.trim()` - null, 0, false are considered as valid value)
- true
    - `!var(empty)`
    - if anotherfield is not exist (it's already different)
- exception
    - if params are less than 1 (* But it checks only if field value is not `undefined` && `!value.trim()`)

# digits:value
- paramsLength
    - 1 (but throws error if value is not empty like `different` rule)
    - parsed using `Number`
- true
    - should be non floating number and exact length mentioned in rule
- exception
    - only if value is `var(not-empty)`

# digits_between:min,max
- true
    - `var(empty)`
- false
    - null
- params (Same like `decimal:min,max`)
    - `var(min-max)`
- exception
    - only if value is `var(not-empty)`

# dimensions
- paramsLength
    - >= 1
    - if params is empty string or invalid it retuns true.
- true
    - `var(empty)`
    - empty rule || invalid rule name
- false
    - !File
    - File.type != 'image'
    - null
    - invalid rule value (not `Number` (min_width,max_width,min_height, & max_height). But `ratio=3/2 or 1.5` is parsed using `parseInt`)
- Note:
    - ratio `1.953826 === 1.953`
- params
    - min_width=value (if value not a valid number that it retuns always false) 
    - `Number` is used for min_width,max_width,min_height, & max_height
    - `parseInt` only for ratio
- exception
    - only if value is `var(not-empty)`
    - if params are less than 1
        - Validation rule dimensions requires at least 1 parameters.

# distinct
- true
    - `var(empty)`
    - !multiple-fields
- false
- params
    - strict
    - ignore_case

# doesnt_start_with
- paramsLength
    - >=0
- true
    - no param
    - value.type != string or number
    - if field value doesn't starts with one of the provided values.
- Laravel
    - Throws an error if field value is array (throws error only if params is not empty, otherwise it retuns true)


# doesnt_end_with:foo,bar,...
- params
    - >= 0
- true
    - no param
    - value.type != string or number
    - if field value doesn't starts with one of the provided values.
- Laravel
    - Throws an error if field value is array (throws error only if params is not empty, otherwise it retuns true)

# email
- params
    - invalid params excluded
- true
    - `var(empty)`

- false
    - value.type != string

# ends_with:foo,bar,...
- params
    - >= 0
- true
    - `var(empty)`
    - if field value ends with one of the provided value
- false
    - no params
    - value.type != string or number
- Laravel
    - Throws an error if field value is array (throws error only if params is not empty, otherwise it retuns false)

# enum

# exclude

# exclude_if
- params
    - >= 2
- true
    - `var(_if)`
- false
    - `!var(_if)`

- exception
    - Even if value is `var(empty)` it first checks rules and params. so it always throws error if params are less than 2.
    - if params are less that 2 throws an error:
        - messsage: Validation rule exclude_if requires at least 2 parameters.

# exclude_unless:anotherfield,value
- params
    - >= 2
- true
    - `!var(_if)`
- false
    - `var(_if)`

- exception
    - Even if value is `var(empty)` it first checks rules and params. so it always throws error if params are less than 2.

# exclude_with:anotherfield
- params
    - == 1
        - even if your provide more than 1 params it always checks first param.
- true
    - if anoterfield is `var(exist)`
- false
- exception
    - Even if value is `var(empty)` it first checks rules and params. so it always throws an error if params are less than 1

# exclude_without:anotherfield
- params
    - == 1
- true
    - if anotherfield is `!var(exist)`
- exception
    - Even if value is `var(empty)` it first checks rules and params. so it always throws an error if params are less than 1

# exists:table,column
- No support (Because at front-end no database access)

# extensions:foo,bar,...
- params
    - >= 0
- true
    - it check only file extension. (Not file type). Even if invalid file is given then also it returns true (file extension exist in params)
    - `var(empty)`
        - it first checks if value is `!var(empty)` then it go to params.
- false
    - params.length == 0
    - `input.type != file`

- exception
    - it doesn't throw error even if params 0 (always)

# file
- true
    - `var(empty)`
- false
    - `input.type != file`

# filled
- true
    - `!var(exist)`
- false
    - field value is one of `null`, `[]`, `!value.trim()`

# gt:field
- params
    - >= 1
- how it works?
    - always should be same type (except string and number)
    - ==inputField==, ==otherField==
    - 5555, '12a' // --false--
    - 5555, '12' // true
    - '5555', '12a' // true
    - '15', 15 // false
    - '16', 15 // true
    - [], [] // false
    - ['foo'], [] // true
    - '12', '123a' // true because 12 is number and greater than 4 ('123a' is 4 because it has 4 characters).
    - ['hello', 'h', 'b', 'c'], '12a' // --false-- // "The gtvalue field must be greater than 3 characters."
    - ['hello', 'h', 'b', 'c'], '1' // --false-- // "The gtvalue field must be greater than 1 characters."
    - ['hello', 'h', 'b', 'c'], '2' // --false-- // "The gtvalue field must be greater than 1 characters."
    - ['hi', ''], ['hi', 'h', 'jack'] // false "The gtvalue field must be greater than 3 characters."
    - file(128kb), file(222kb) // false "The file field must be greater than 222.5107421875 kilobytes."
    - file(222kb), file(128kb) // true
    - file(128kb), '12' // --false-- The file field must be greater than 2 kilobytes.
    - file(128kb), '12a' // --false-- The file field must be greater than 3 kilobytes.
    - file(128kb), '12a' // --false-- The file field must be greater than 3 kilobytes.
    - file(128kb), ['15k', 'jack'] // --false-- "The file field must be greater than 2 kilobytes."
    
    // ==== SUM UP ====
    - it first checks value type (Note: '3' and 3 are same, if value is string and only has numbers that it is considered as `type = number`)
    - If both data types are not same then it's always false.
    - It always throws error based on input value data type. If string or array it says characters, if file it says kilobytes, if number it just says number.
- true
    - `var(empty)`
- false
    - different data types.
- exception
    - if params are less than 1 then it throws error (Only if te value is `!var(empty)`)

# gte:field
- params
- how it works?
    Same like `gt:field rule`
- true
    - `var(empty)`
- false
    - different data types.
- exception

# hex_color
- true
    - `var(empty)`
- false
    - `input.type != string`

# image
- how it works?
    - It actally reads the file content and then tells if it's image or not.
    - (jpg, jpeg, png, bmp, gif, svg, or webp)
    - even tiff file type starts with 'image/' is still not valid. only above types are valid.
- true
    - `var(empty)`
- false
    - `input.type != file`

# in:foo,bar,...
- params
    - >= 0
- how it works?
    params not trimmed.
    if in rule combined wit `array` rule it checks each value in the `input array`
- Note:
    - true & 'true' are different not like _if.
- true
    - `var(empty)`
- false
    - if input.type is not string or number but it is array and rule doesn't have `array` rule then it always retuns false.
    - input.type is not string, number and array
    - paras.length === 0
- exception
    - no-exception

# in_array:anotherfield.*
- params
    - === 1
- true
    - `var(empty)`
- false
    - otherfield value is not multiple value (which is grab using whilecard *)
- exception
    - if input.value is `!var(empty)` and params.length === 0. throws an error:
        Validation rule in_array requires at least 1 parameters.

# integer
- Note:
    - value is trimmed
- true
    - `var(empty)`
    - if value is not floating integer
- false

# ip
- true
    - `var(empty)`
    - if input data is either ipv4 or ipv6
- false

# ipv4
- true
    - `var(empty)`
    - if input data is should be ipv4
- false

# ipv6
- true
    - `var(empty)`
    - if input data is should be ipv4
- false

# json
- true
    - `var(empty)`
- false

# lt:field
- params
    - === 1
- how it works?
    Same like `gt:field rule`
- true
    - `var(empty)`
- false
    - different data types.
- exception
    - if params are less than 1 then it throws error (Only if te value is `!var(empty)`)

# lte:field
- params
    - === 1
- how it works?
    Same like `gt:field rule`
- true
    - `var(empty)`
- false
    - different data types.
- exception
    - if params are less than 1 then it throws error (Only if te value is `!var(empty)`)

# lowercase
- true
    - `var(empty)`
- false

# list
- true
    - `var(empty)`
- false
    - input.type != array | plain object

# mac_address
- true
    - `var(empty)`
- false

# max:value
- params
    - === 1
- Note:
    - when `input.type == array` and we don't mention `array` in rule then if validation fails it says `not more than :value characters instead of items`, but not with file (it always says kilobytes)
    - if input.value is string but "integer, numeric or related" rules are applied then while showing message it considers value type as number only. same with other types.
    - Even rule has array or number but still validate as per input.type.
- true
    - `var(empty)`
- false
- exception
    - if params are less than 1 then it throws error (Only if te value is `!var(empty)`)
        - Validation rule max requires at least 1 parameters.
    - if rule value is not a valid number (Parsed using `Number`)
        - The given value "1x" does not represent a valid number.

# max_digits:value
- params
    - === 1
- true
    - `var(empty)`
- false
    - input.type != integer (non floating number)
    - rule value is not number/floating number (Parsed using `Number`)
- exception
    - if params are less than 1 then it throws error (Only if te value is `!var(empty)`)

# mimetypes:text/plain,...
- params
    - >= 0
- true
    - `var(empty)`
- false
    - `input.type != file`
    - rule params.length == 0
- exception
    - no-exception
- Laravel
    - Laravel actually reads the content then decides if the data is valid or not. I doesn't just depend on file types which is assigned by user.

# mimes
- params
    - >= 0
- Note:
https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types

- true
    - `var(empty)`
- false
    - `input.type != file`
    - rule params.length == 0
- exception
    - no-exception

# min:value
- same like max

# min_digits:value
same like `min`

# multiple_of:value
- params
    - === 1
- true
    - `var(empty)`
- false
    - rule value or input value is not number/floating number (Parsed using `Number`)
- exception
    - if params are less than 1 then it throws error (Only if te value is `!var(empty)`)
        - Validation rule multiple_of requires at least 1 parameters.

# missing
- true
    - input.value === undefined

# missing_if:anotherfield,value,...
- params
    - >= 2
- true
    - `!var(_if)`
- false
- exception
    - if params.length < 2 throws an error (always)
        Validation rule missing_if requires at least 2 parameters.

# missing_unless:anotherfield,value
- params
    - >= 2
- true
    - `var(_if)`
- false
- exception
    - if params.length < 2 throws an error (always)
        Validation rule missing_if requires at least 2 parameters.

# missing_with:foo,bar,...
- params
- >= 1
- How it works?
    - if any of the field `var(exist)` field under validation must be `!var(exist)`.
- exception
    - if params are less than 1 then it throws error (always)
        - Validation rule missing_with requires at least 1 parameters.

# missing_with_all:foo,bar,....
- same like `missing_with`

# not_in:foo,bar,...
- params
    - >= 0
- how it works?
    params not trimmed.
    if in rule combined wit `array` rule, it checks each value in the `input array`, retuns false only if all the items are in params
- Note:
    - true & 'true' are different not like _if.
- true
    - `var(empty)`
    - paras.length === 0
    - if input.type is not string or number but it is array and rule doesn't have `array` rule then it always retuns true.
    - input.type is not string, number and array
- false
- exception
    - no-exception

# not_regex:pattern
- params
    - === 1
- true
    - `var(empty)`
- false
    - input.type != string or number
- exception
    - if params are less than 1 then it throws error (Only if te value is `!var(empty)`)
        - Validation rule not_regex requires at least 1 parameters.
    - invalid regex
        - preg_match(): Delimiter must not be alphanumeric, backslash, or NUL

# nullable
- The field under validation may be null.

# numeric
- Note:
    - input value is trimmed before validating
- true
    - `var(empty)`
    - input value is either integer or floating number. (both positive and negative)
    - `Number(input value) != NaN`
- false
    - input value type is not string or number

# present
- true
    - input.value !== undefined

# present_if:anotherfield,value,...
- same like `missing_if`

# present_unless:anotherfield,value
- same like `missing_unless`

# present_with:foo,bar,...
- same like `missing_with`

# present_with_all:foo,bar,...
- same like `missing_with_all`

# prohibited
- true
    - `!var(exist)` || `var(@empty)`

# prohibited_if:anotherfield,value,...
- params
    - >= 2
- true
    - `!var(_if)`
- false
- exception
    - if params are less than 2 then it throws error (Only if te value is `!var(empty)`)
        Validation rule prohibited_if requires at least 2 parameters.

# prohibited_unless:anotherfield,value,...
- params
    - >= 2
- true
    - `var(_if)`
- false
- exception
    - if params are less than 2 then it throws error (Only if te value is `!var(empty)`)
        Validation rule prohibited_unless requires at least 2 parameters.

# prohibits:anotherfield,...
- params
    - >= 0
- true
    - `!var(exist)` || `var(@empty)`
    - params.length == 0
    - if field under validation is `var(exist)` || `!var(@empty)` then all the fields in the anotherfield must be `!var(exist)` || `var(@empty)`
- false
- exception
    - no-exception

# regex:pattern
- same like `not_regex`

# required
- false
    - `!var(exist)` || `var(@empty)`

# required_if:anotherfield,value,...
- params
    - >= 2
- true
    - `!var(_if)`
- exception
    - if params.length < 2 then it throws an error (always)

# required_if_accepted:anotherfield,...
- params
    - >= 1
- Note:
    - Only first anoterfield is checked.
- true
    - `!var(_if_accepted)`
- false
- exception
    - if params.length < 1 then it throws an error (always)
        Validation rule required_if_accepted requires at least 1 parameters.
        
# required_if_declined:anotherfield,...
- params
    - >= 1
- Note:
    - Only first anoterfield is checked.
- true
    - `!var(_if_declined)`
- false
- exception
    - if params.length < 1 then it throws an error (always)
        Validation rule required_if_accepted requires at least 1 parameters.

# required_unless:anotherfield,value,...
- params
    - >= 0
- true
    - `var(_if)`
- exception
    - if params.length < 2 then it throws an error (always)

# required_with:foo,bar,...
- params
    - >= 0
- Note:
    if **any** of the anotherfields are `var(exist) || !var(@empty)` field under validtion should be `var(exist) || !var(@empty)`
- true
    - params.length === 0
- false
- exception
    - no-exception

# required_with_all:foo,bar,...
- params
    - >= 0
- Note:
    if **all** the anotherfields are `var(exist) || !var(@empty)` field under validtion should be `var(exist) || !var(@empty)`
- true
- false
    - params.length === 0 && (`!var(exist) || var(@empty)`)
- exception
    - no-exception

# requried_without:foo,bar,...
- params
    - >= 0
- Note:
    if **any** of the anotherfields are `!var(exist) || var(@empty)` field under validtion should be `var(exist) || !var(@empty)`
- true
    - params.length === 0
- false
- exception
    - no-exception

# required_without_all:foo,bar,...
- params
    - >= 0
- true
- Note:
    if **all** the anotherfields are `!var(exist) || var(@empty)` field under validtion should be `var(exist) || !var(@empty)`
- false
    - params.length === 0 && (`!var(exist) || var(@empty)`)
- exception
    - no-exception


# required_array_keys:foo,bar,...
- params
    - >= 0
    - Note: `un-trimmed`
- true
    - `var(empty)`
    - `input.type === array | plain object` && `params.length == 0`

- false
- exception
    - no-exception

# same:field
- params
    - === 0
    - `un-trimmed`
- true
    - `var(empty)`
- false
- exception
    - if params.length is 0, then it throws error (Only if te value is `!var(empty)`)
        Validation rule same requires at least 1 parameters.

# size:value
- params
    - === 0
    - Parsed using `Number`
- Note:
    - when `input.type == array` and we don't mention `array` in rule then if validation fails it says `not more than :value characters instead of items`, but not with file (it always says kilobytes)
    - if input.value is string but "integer, numeric or related" rules are applied then while showing message it considers value type as number only. same with other types.
    - Even rule has array or number but still validate as per input.type.
- true
    - `var(empty)`
- false
- exception
    - if params.length is 0, then it throws error (Only if te value is `!var(empty)`)
        Validation rule size requires at least 1 parameters.
    - invalid param (number)
        - The given value "5k" does not represent a valid number.

# starts_with:foo,bar,...
- params
- Note:
    - input.value can't be starts with empty string ('');
- true
    - `var(empty)`
- false
    - params.length === 0
    - params.length === 0 && params[0] === ''
- exception
    - no-exception

# string
- Note:
    - it returns false for numbers too. it checks data `type typeof input === "string"`
- true
    - `var(empty)`
- false

# timezone
- `skip-for-now`
- How it works?
    - it uses DateTimeZone::listIdentifiers method.

# unique:table,column
- `not-supported` (it is possible only at backend)

# uppercase
- true
    - `var(empty)`
- false
    - input.type != string
- Laravel
    - throws error if array is provided.

# url
- params
    - >= 0
- true
    - `var(empty)`
- false
- exception
    - no-exception (because params is optional)
- Laravel
    - by default laravel returns false, if protocol is invalid. But it returns true if we mention it in protocol.

# ulid
- true
    - `var(empty)`
- false

# uuid
- true
    - `var(empty)`
- false


Variables:
exist = !undefined
empty = undefined or !value.trim()
not-empty = !undefined && !!value.trim()
@empty = null or !value.trim() or empty-array or empty-plain-object or !file.path
min-max = 
    - should be number, parsed using `parseInt()`
    - after parsing using `parseInt` also if `min` is not [0-9] then `value` should me `>` instead of `>=`
    - if `min` is `NaN` then it retuns always false
    - if `max` is `NaN` then it is considers as `infinity`
    - Note: `!value.trim()` are parsed as 0 (already `parseInt` handles that)

_if = 
    Even spaces and empty string are considered while comparison.
    - true
        - matchs data
            - loose comparison
                - 'data' == 'data'
                - 10 == '10'
                - null == 'null'
                - true == 'true'
                - false == 'false'
        - In the _if rule, another field can be specified as user.0.image but not as user.*.image (using a wildcard), as the latter will always return false.
            E.g.
                user.0.image // ok
                user.*.image // not ok (retuns false)
    - false
        - anotherfield-not-exist
        - anotherfield returns multivalue (when using a wildcard)
            E.g. user.*.image
        - [] != ('' or '[]', '0', 'null', 'false')



Study:

https://wpwebinfotech.com/blog/laravel-file-upload/


-> used with `in:foo,bar`
    Rule::in(['foo', 'bar']),



```ts
function sometimes(field: string, rules:ValidatorRules[string], condition:(input:any, item:any) => boolean) {
    // If input item is undefined, then condition is always false. (Only if wildcard * is used, if not wildcard used and `item` is undefined Laravel throws error if `item` is undefined or not array or object)
}

```