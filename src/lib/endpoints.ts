export const API_ENDPOINTS = {
  INIT_GRAPH: "/v1/init",
  GRAPH_DATA: "/v1/graph-data",
  IMPORT_SHEETS: "/v1/import-sheets",
  CHAT: "/v1/chat",
  GET_KWL_GRAPH_DATA: "/v1/get-knowledge-graph",
  TRUSTED_ADVISOR_SCORE: "/v1/signals/trusted-advisor-score",
  NON_OBVIOUS_CONNECTIONS: "/v1/signals/non-obvious-connections",
  CO_INVESTOR_PARTNERSHIP_SYNERGY:
    "/v1/signals/co-investor-partnership-synergy",
  CONFLICT_OF_INTEREST: "/v1/signals/conflict-of-interest",
  COLLABORATIVE_NETWORK_STRENGTH: "/v1/signals/collaborative-network-strength",
  SUGGESTIONS: "/v1/suggestions",
  SP_MATCHED_WITH_COUNTRY_INTEREST:
    "/v1/signals/sp-matched-with-country-interest", // New API name

  FO_MATCHED_WITH_COUNTRY_INTEREST:
    "/v1/signals/fo-matched-with-country-interest",
  TOP_SERVICE_PROVIDERS: "/v1/signals/top-service-providers",
  GET_ORG_WITH_STATE_PRODUCT: "/v1/signals/get-orgs-by-state-product",
  GET_PRODUCT_LIST: "/v1/product/get-product-tags",
  GET_STATE_LIST: "/v1/state/get-states", // Endpoint for fetching states
  GET_ORG_TYPE_LIST: "/v1/org-type/get-org-type", // Endpoint for fetching organization types
  GET_ORG_SUB_TYPE_LIST: "/v1/org-sub-type/get-org-sub-type", // Endpoint for fetching organization sub-types
};

export default API_ENDPOINTS;
