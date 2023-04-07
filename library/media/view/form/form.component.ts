import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PicturesService } from '../../pictures.service';
import { Picture, Video } from '../../types';
import { VideosService } from '../../videos.service';

export interface ViewFormData {
  doc: AnyDto<Picture | Video>;
  media: PicturesService | VideosService;
}

@Component({
  selector: 'wpx-media-view-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`名称不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: ViewFormData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
    this.form.patchValue(this.data.doc);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.data.media
      .updateById(
        this.data.doc._id,
        {
          $set: data
        },
        {
          xdata: { '$set.tags': 'oids' }
        }
      )
      .subscribe(_ => {
        this.data.doc.name = data.name;
        this.message.success($localize`数据更新完成`);
        this.modalRef.triggerOk();
      });
  }
}
