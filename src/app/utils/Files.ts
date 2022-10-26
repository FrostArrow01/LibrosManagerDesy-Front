import { HttpEventType, HttpResponse } from "@angular/common/http";

declare global {
    interface Navigator {
        msSaveBlob?: (blob: any, defaultName?: string) => boolean
    }
}

export class Files {
    static FRAME_DOWNLOAD_ID = 'download-frame';
    static createAndDownloadBlobFile(body: BlobPart, options: BlobPropertyBag, filename: string): void {
      const blob = new Blob([body], options);
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');
        // Browsers that support HTML5 download attribute
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
    static saveBlobAsFile(data: HttpResponse<any> | BlobPart, dataType: HttpEventType.Response | string, filename: string): void {
      let blob: Blob;
      if (data instanceof HttpResponse) {
        const binaryData = [];
        binaryData.push(data.body);
        blob = new Blob(binaryData, { type: `${dataType}` });
      } else {
        blob = new Blob([data], { type: `${dataType}` });
      }
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');
        // Browsers that support HTML5 download attribute
        if (link.download !== undefined) {
          const url = window.URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
    static downloadFromUrl(url: string): void {
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    /**
     * Not working well in IE11, Security Exception opening the iframe
     */
    static downloadFromUrlAsIFrame(url: string): void {
      const iframe = document.createElement('iframe');
      if (document.getElementById(Files.FRAME_DOWNLOAD_ID)) {
        const element = document.getElementById(Files.FRAME_DOWNLOAD_ID);
        if (element?.remove) {
          element.remove();
        } else {
          element!.parentNode!.removeChild(element!);
        }
      }
      iframe.style.visibility = 'hidden';
      iframe.setAttribute('id', Files.FRAME_DOWNLOAD_ID);
      iframe.setAttribute('src', url);
      document.body.appendChild(iframe);
    }
 }