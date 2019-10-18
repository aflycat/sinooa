//单行输入框
export const component = {
    input: {
        type: 'input',
        label: '标题',
        props: 'text',
        value: '',
        width: 100,
        maxlength: null,
        readonly: false,
        disabled: false
    },
    textarea: {
        type: 'textarea',
        label: '标题',
        props: 'textarea',
        placholder: '请输入内容',
        value: '',
        width: 100,
        rows: 5,
        maxlength: null,
    },
    checkbox: {
        type: 'checkbox',
        label: '标题',
        width: 100,
        value: [],
        items: [{
                label: '选项1',
            },
            {
                label: '选项2',
            }
        ]
    },
    radio: {
        type: 'radio',
        label: '标题',
        width: 100,
        value: '',
        items: [{
                label: '选项1',

            },
            {
                label: '选项2',

            }
        ]
    },
    select: {
        type: 'select',
        label: '标题',
        width: 100,
        multiple: true,
        value: "",
        items: [{
                label: '选项1',
                value: '0',

            },
            {
                label: '选项2',
                value: '1',

            }
        ]
    },
    timepicker: {
        type: 'timepicker',
        label: '标题',
        width: 100,
        value: '',
        minCompany: 'date'
    },
    email: {
        type: 'email',
        props: 'email',
        label: '标题',
        value: '',
        width: 100,
        maxlength: null,
        readonly: false,
        disabled: false
    },
    number: {
        type: 'number',
        props: 'number',
        label: '标题',
        value: '',
        width: 100,
        maxlength: null,
        readonly: false,
        disabled: false
    }
}