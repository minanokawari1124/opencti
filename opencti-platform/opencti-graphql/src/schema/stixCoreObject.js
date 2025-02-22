import { isStixCyberObservable } from './stixCyberObservable';
import { isStixDomainObject } from './stixDomainObject';
import { isStixMetaObject } from './stixMetaObject';
import { isInternalObject } from './internalObject';
import { ABSTRACT_BASIC_OBJECT, ABSTRACT_STIX_CORE_OBJECT, ABSTRACT_STIX_OBJECT, buildRefRelationKey } from './general';
import { isBasicRelationship, isStixRelationShipExceptMeta } from './stixRelationship';
import {
  RELATION_CREATED_BY,
  RELATION_EXTERNAL_REFERENCE,
  RELATION_OBJECT,
  RELATION_OBJECT_LABEL,
  RELATION_OBJECT_MARKING
} from './stixMetaRelationship';
import { RELATION_INDICATES } from './stixCoreRelationship';
import { RELATION_PARTICIPATE_TO } from './internalRelationship';

export const INTERNAL_EXPORTABLE_TYPES = [RELATION_PARTICIPATE_TO];

export const isStixCoreObject = (type) => isStixDomainObject(type) || isStixCyberObservable(type) || type === ABSTRACT_STIX_CORE_OBJECT;
export const isStixObject = (type) => isStixCoreObject(type) || isStixMetaObject(type) || type === ABSTRACT_STIX_OBJECT;
export const isBasicObject = (type) => isInternalObject(type) || isStixObject(type) || type === ABSTRACT_BASIC_OBJECT;
export const isStixExportableData = (instance) => isStixObject(instance.entity_type)
  || isStixRelationShipExceptMeta(instance.entity_type) || INTERNAL_EXPORTABLE_TYPES.includes(instance.entity_type);
export const isBasicData = (instance) => isBasicObject(instance.entity_type) || isBasicRelationship(instance.entity_type);

export const stixCoreObjectOptions = {
  StixCoreObjectsFilter: {
    createdBy: buildRefRelationKey(RELATION_CREATED_BY),
    markedBy: buildRefRelationKey(RELATION_OBJECT_MARKING),
    labelledBy: buildRefRelationKey(RELATION_OBJECT_LABEL),
    objectContains: buildRefRelationKey(RELATION_OBJECT),
    containedBy: buildRefRelationKey(RELATION_OBJECT),
    hasExternalReference: buildRefRelationKey(RELATION_EXTERNAL_REFERENCE),
    indicates: buildRefRelationKey(RELATION_INDICATES),
    creator: 'creator_id',
  },
  StixCoreObjectsOrdering: {
    creator: 'creator_id'
  }
};
