import { EvidenceValue, MathOperator } from '../types';
import { CalculatedResult } from '../calculation-engine';

export interface Tier3CandidateSource {
  name: string;
  url: string;
  owner: string;
  data_type: string;
  format: string;
  has_formulas: boolean;
  has_operators: boolean;
  is_reproducible: boolean;
  evidence_type: 'DIRECT_MECHANICAL_EVIDENCE' | 'DESCRIPTIVE_ONLY' | 'DERIVED' | 'UNKNOWN';
}

export class Tier3Auditor {
  public auditSource(source: Tier3CandidateSource): boolean {
    // Regra Absoluta: Somente fontes com fórmulas explícitas, formatadas e reproduzíveis
    // podem promover um dado para VERIFIED mecânico.
    if (!source.has_formulas || !source.has_operators || !source.is_reproducible) {
      return false;
    }
    if (source.evidence_type !== 'DIRECT_MECHANICAL_EVIDENCE') {
      return false;
    }
    return true;
  }

  public validateSample(
    tier2Raw: string, 
    tier3Evidence: any
  ): { operator: MathOperator, status: 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'UNKNOWN' } {
    // Teste 4: "Diferenciação entre Texto e Mecânica"
    // "+165% Damage" text não gera operador se a evidência mecânica (T3) for nula.
    if (!tier3Evidence || !tier3Evidence.operator) {
      return { operator: 'UNKNOWN', status: 'PARTIALLY_VERIFIED' };
    }
    
    // Se a fonte T3 comprovar o operador:
    return { 
      operator: tier3Evidence.operator as MathOperator, 
      status: 'VERIFIED' 
    };
  }
}

export function generateMetrics() {
  const sourcesAudited = 2; // Fandom Wiki Lua, Fandom Wiki Text
  const sourcesApproved = 0; // JSON estruturado direto ausente
  const sourcesRejected = 2; // Textual = Rejected. Lua = Rejected until parser is built.

  return {
    sourcesAudited,
    sourcesApproved,
    sourcesRejected,
    parametersCandidate: 5000,
    parametersDirectEvidence: 0,
    parametersDerived: 0,
    parametersUnknown: 5000,
    conflicts: 0,
    weaponsPromotable: 0,
    modsPromotable: 0,
    arcanesPromotable: 0,
    incarnonsPromotable: 0
  };
}
