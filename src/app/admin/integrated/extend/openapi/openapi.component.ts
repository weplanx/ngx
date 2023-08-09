import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-integrated-extend-openapi',
  templateUrl: './openapi.component.html'
})
export class OpenapiComponent implements OnInit {
  form!: FormGroup;
  tips = {
    OpenapiKey: {
      default: {
        required: $localize`App Key 不能为空`
      }
    },
    OpenapiSecret: {
      default: {
        required: $localize`App Secret 不能为空`
      }
    },
    OpenapiUrl: {
      default: {
        required: $localize`地址不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: R,
    private wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      OpenapiUrl: [null, [Validators.required]],
      OpenapiKey: [null, [Validators.required]],
      OpenapiSecret: [null, [Validators.required]]
    });
    this.form.patchValue({
      OpenapiUrl: this.data['OpenapiUrl'],
      OpenapiKey: this.data['OpenapiKey']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
