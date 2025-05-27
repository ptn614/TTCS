// Form.js - Seat Form
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

export default function SeatForm({ seat, onSubmit }) {
    const initialValues = {
        tenGhe: seat?.tenGhe || '',
        giaVe: seat?.giaVe || 75000,
        loaiGhe: seat?.loaiGhe || 'Thuong'
    };

    const validationSchema = yup.object({
        tenGhe: yup.string().required("Tên ghế không được bỏ trống"),
        giaVe: yup.number().required("Giá vé bắt buộc").min(0, "Giá phải >= 0"),
        loaiGhe: yup.string().required("Loại ghế bắt buộc")
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            <Form>
                <div className="form-group">
                    <label>Tên ghế</label>
                    <Field name="tenGhe" className="form-control" />
                    <ErrorMessage name="tenGhe" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                    <label>Giá vé</label>
                    <Field name="giaVe" type="number" className="form-control" />
                    <ErrorMessage name="giaVe" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                    <label>Loại ghế</label>
                    <Field as="select" name="loaiGhe" className="form-control">
                        <option value="Thuong">Thường</option>
                        <option value="Vip">Vip</option>
                    </Field>
                    <ErrorMessage name="loaiGhe" component="div" className="text-danger" />
                </div>

                <button type="submit" className="btn btn-primary">Lưu</button>
            </Form>
        </Formik>
    )
}
