max_digits
When fieldValue is true then it treats as 1 and if false it treats as 0 (Shouldn't be)

integer
When fieldValue is boolean the it convert to 1 or 0

in_array
When otherfieldValue array has true then it always returns true because it thinks "true == Boolean(anything)"

`max_digits` parases param using `parseFloat` and `digits` use `Number`