import { API } from '../../api';

export type Description = {
  description: {
    classification: {
      standard: string;
      code: string;
    };
  };
};

export type FormValues = {
  classification: {
    standard: string;
    code: string;
  };
};

export class DescriptionFormService {
  private api: API = new API();
  readonly slideID: string;
  readonly descriptionEndpoint: string;

  constructor(slideID: string) {
    this.slideID = slideID;
    this.descriptionEndpoint = this.getDescriptionEndpoint(slideID);
  }

  private getDescriptionEndpoint = (slideID: string) => {
    return `/repository/slides/${slideID}/description`;
  };

  private createNewDescription = (formValues: FormValues, id: string) => ({
    ...formValues,
    slide_id: id
  });

  private initialValues = (standard?: string, code?: string) => ({
    classification: {
      standard: standard || '',
      code: code || ''
    }
  });

  createInitialFormValues = (description: [] | Description): FormValues => {
    if (Array.isArray(description)) {
      return this.initialValues();
    } else {
      const {
        classification: { standard, code }
      } = description.description;
      return this.initialValues(standard, code);
    }
  };

  getDescription = () => {
    return this.api.get(this.descriptionEndpoint);
  };

  updateDescription = (formValues: FormValues) => {
    const newDescription = JSON.stringify(
      this.createNewDescription(formValues, this.slideID)
    );
    return this.api.put(this.descriptionEndpoint, { body: newDescription });
  };
}
