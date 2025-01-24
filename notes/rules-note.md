Passed to validation, even if value is `var(empty)`
- accepted_if

Params
- no-trim
    - accepted_if
    - alpha:ascii
    - alpha_dash:ascii (If any space found it returns false)
    - alpha_num:ascii
    - array
    - between:min,max
    - contains:foo,bar,...
    - decimal:min,max
    - declined_if:anotherfield,value,...
    - different:field
    - digits:value
    - digits_between:min,max
    - dimensions
    - doesnt_start_with:foo,bar,...
    - doesnt_end_with:foo,bar,...
    - email
    - ends_with:foo,bar,...
    - exclude_if:anotherfield,value
    - exclude_unless:anotherfield,value
    - exclude_with:anotherfield

- trim




Date
- after:date
- after_or_equal:date
- before:date
- before_or_equal:date
- date_equals:date
-> date_format:format,...


Message placeholders:

:attribute
:other, :value - Other field specified in rule params (_if)
:date
:min, :max - 







# Note
Remove right and left quotes of params
- contains

Parsed other field needed: (additional data expected with boolean)
- different

Required:
- prohibited
- prohibited_if
- required


prohibited
Doesn't support empty File thing

password
Doesn't support uncompromised()