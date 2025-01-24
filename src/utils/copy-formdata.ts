export default function copyFormData(formData:FormData) {
    const duplicateForm = new FormData();
    formData.forEach((value, key) => duplicateForm.append(key, value));
    return duplicateForm;
}