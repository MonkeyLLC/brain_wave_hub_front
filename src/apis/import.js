import httpInstance from '@/utils/http';
import {ref} from 'vue';

export function importSingle(form, file) {
    const formData = new FormData();
    formData.append('file', file); // Append the file to FormData
    // Append other form fields if needed
    Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
    });

    console.log("formData:", formData.get('uploadTime'));

    return httpInstance.put(`/import/single`, formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data' // Set correct content type
        }
    });
}

export function uploadRecord(name) {
    return httpInstance.post(`/import/record`, name);
}
